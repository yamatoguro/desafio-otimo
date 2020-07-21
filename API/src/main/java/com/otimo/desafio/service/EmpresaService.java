package com.otimo.desafio.service;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.otimo.desafio.model.Empresa;
import com.otimo.desafio.model.Endereco;
import com.otimo.desafio.model.dto.EmpresaDTO;
import com.otimo.desafio.repository.EmpresaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private TipoService tipoService;

    public List<EmpresaDTO> getEmpresas() {
        List<EmpresaDTO> empresas = new ArrayList<EmpresaDTO>();
        empresaRepository.findAll().forEach(e -> {
            EmpresaDTO e2 = new EmpresaDTO();
            e2.setCnpj(e.getCnpj());
            e2.setTipo(tipoService.getTipo(e.getId_tipo()));
            e2.setNome(e.getNome());
            e2.setRazao_social(e.getRazao_social());
            e2.setTelefone(e.getTelefone());
            e2.setEmail(e.getEmail());
            e2.setEndereco(enderecoService.getEndereco(e.getId_endereco()));
            empresas.add(e2);
        });
        return empresas;
    }

    public EmpresaDTO getEmpresa(String cnpj) {
        Empresa e = empresaRepository.findByCnpj(cnpj);
        EmpresaDTO e2 = new EmpresaDTO();
        e2.setCnpj(e.getCnpj());
        e2.setTipo(tipoService.getTipo(e.getId_tipo()));
        e2.setNome(e.getNome());
        e2.setRazao_social(e.getRazao_social());
        e2.setTelefone(e.getTelefone());
        e2.setEmail(e.getEmail());
        e2.setEndereco(enderecoService.getEndereco(e.getId_endereco()));
        return e2;
    }

	public String cadastra(EmpresaDTO dto) {
        Empresa empresa = new Empresa();
        Endereco endereco = enderecoService.cadastra(dto.getEndereco());
        empresa.setCnpj(dto.getCnpj());
        empresa.setId_tipo(tipoService.getTipoId(dto.getTipo()));
        empresa.setNome(dto.getNome());
        empresa.setRazao_social(dto.getRazao_social());
        empresa.setTelefone(dto.getTelefone());
        empresa.setEmail(dto.getEmail());
        empresa.setId_endereco(endereco.getId_endereco());
        empresaRepository.save(empresa);
        Gson gson = new Gson();
		return gson.toJson(empresa);
	}

	public String atualiza(String cnpj, EmpresaDTO dto) {
		Empresa empresa = empresaRepository.findByCnpj(cnpj);
        Endereco endereco = enderecoService.cadastra(dto.getEndereco());
        empresa.setCnpj(dto.getCnpj());
        empresa.setId_tipo(tipoService.getTipoId(dto.getTipo()));
        empresa.setNome(dto.getNome());
        empresa.setRazao_social(dto.getRazao_social());
        empresa.setTelefone(dto.getTelefone());
        empresa.setEmail(dto.getEmail());
        empresa.setId_endereco(endereco.getId_endereco());
        empresaRepository.save(empresa);
        Gson gson = new Gson();
		return gson.toJson(empresa);
	}

	public String delete(String cnpj) {
        Empresa empresa = empresaRepository.findByCnpj(cnpj);
        empresaRepository.delete(empresa);
		return null;
	}

}