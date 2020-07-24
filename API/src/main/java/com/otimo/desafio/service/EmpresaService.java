package com.otimo.desafio.service;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.otimo.desafio.model.Empresa;
import com.otimo.desafio.model.Endereco;
import com.otimo.desafio.model.dto.EmpresaDTO;
import com.otimo.desafio.repository.EmpresaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EnderecoService enderecoService;

    public Page<EmpresaDTO> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "nome");
        Page<Empresa> empresas = empresaRepository.findAll(pageRequest);
        return new PageImpl<EmpresaDTO>(toDtoList(empresas.getContent()), pageRequest, size);
    }

    public Page<EmpresaDTO> search(String searchTerm, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "nome");
        Page<Empresa> empresas = empresaRepository.search(searchTerm.toLowerCase(), pageRequest);
        return new PageImpl<EmpresaDTO>(toDtoList(empresas.getContent()), pageRequest, size);
    }

    public EmpresaDTO getEmpresa(String cnpj) {
        Empresa empresa = empresaRepository.findByCnpj(cnpj);
        EmpresaDTO dto = new EmpresaDTO();
        dto = toDTO(empresa, dto);
        return dto;
    }

    public String cadastra(EmpresaDTO dto) {
        Empresa empresa = new Empresa();
        Endereco endereco = enderecoService.cadastra(dto.getEndereco());
        empresa = fromDTO(dto, empresa, endereco);
        empresaRepository.save(empresa);
        Gson gson = new Gson();
        return gson.toJson(empresa);
    }

    public String atualiza(String cnpj, EmpresaDTO dto) {
        Empresa empresa = empresaRepository.findByCnpj(cnpj);
        Endereco endereco = enderecoService.cadastra(dto.getEndereco());
        empresa = fromDTO(dto, empresa, endereco);
        Gson gson = new Gson();
        return gson.toJson(empresa);
    }

    private EmpresaDTO toDTO(Empresa empresa, EmpresaDTO dto) {
        dto.setCnpj(empresa.getCnpj());
        dto.setTipo(empresa.getTipo());
        dto.setNome(empresa.getNome());
        dto.setRazao_social(empresa.getRazao_social());
        dto.setTelefone(empresa.getTelefone());
        dto.setEmail(empresa.getEmail());
        dto.setEndereco(enderecoService.getEndereco(empresa.getId_endereco()));
        return dto;
    }

    public Empresa fromDTO(EmpresaDTO dto, Empresa empresa, Endereco endereco) {
        empresa.setCnpj(dto.getCnpj());
        empresa.setTipo(dto.getTipo());
        empresa.setNome(dto.getNome());
        empresa.setRazao_social(dto.getRazao_social());
        empresa.setTelefone(dto.getTelefone());
        empresa.setEmail(dto.getEmail());
        empresa.setId_endereco(endereco.getId_endereco());
        return empresa;
    }

    public List<EmpresaDTO> toDtoList(List<Empresa> list) {
        List<EmpresaDTO> dtos = new ArrayList<>();
        list.forEach(e -> {
            EmpresaDTO dto = new EmpresaDTO();
            dto = toDTO(e, dto);
            dtos.add(dto);
        });
        return dtos;
    }

    public String delete(String cnpj) {
        Empresa empresa = empresaRepository.findByCnpj(cnpj);
        empresaRepository.delete(empresa);
        return null;
    }

    public long count(String searchString){
        if(!searchString.isEmpty() && searchString != null)
            return empresaRepository.countFitered(searchString);
        else
            return empresaRepository.count();
    }
}