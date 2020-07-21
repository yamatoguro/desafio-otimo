package com.otimo.desafio.service;

import com.otimo.desafio.model.Endereco;
import com.otimo.desafio.repository.EnderecoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    @Autowired(required = true)
    private EnderecoRepository enderecoRepository;

    public Endereco getEndereco(long id) {
        return enderecoRepository.findById(id).get();
    }

	public Endereco cadastra(Endereco endereco) {
        enderecoRepository.save(endereco);
		return endereco;
	}

	public Endereco atualiza(Long id, Endereco endereco) {
        Endereco e = enderecoRepository.findById(id).get();
        e.setCep(endereco.getCep());
        e.setEstado(endereco.getEstado());
        e.setBairro(endereco.getBairro());
        e.setCidade(endereco.getCidade());
        e.setLogradouro(endereco.getLogradouro());
        e.setComplemento(endereco.getComplemento());
        enderecoRepository.save(e);  
		return endereco;
	}

	public String delete(Long id) {
        enderecoRepository.deleteById(id);
		return "Excluído com sucesso!";
    }

}