package com.otimo.desafio.service;

import com.otimo.desafio.repository.TipoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoService {

    @Autowired
    private TipoRepository tipoRepository;

    public String getTipo(Long id_tipo) {
        return tipoRepository.findById(id_tipo).get().getDescricao();
    }

	public Long getTipoId(String tipo) {
		return tipoRepository.findByDescricao(tipo).getId_tipo();
	}

}