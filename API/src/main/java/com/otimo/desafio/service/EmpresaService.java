package com.otimo.desafio.service;

import java.util.ArrayList;
import java.util.Arrays;
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
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "id");
        Page<Empresa> empresas = empresaRepository.findAll(pageRequest);
        return new PageImpl<EmpresaDTO>(toDtoList(empresas.getContent()), pageRequest, size);
    }

    public Page<EmpresaDTO> search(String searchTerm, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "id");
        Page<Empresa> empresas = empresaRepository.search(searchTerm.toLowerCase(), pageRequest);
        return new PageImpl<EmpresaDTO>(toDtoList(empresas.getContent()), pageRequest, size);
    }

    public EmpresaDTO getEmpresa(long id) {
        Empresa empresa = empresaRepository.findById(id).get();
        EmpresaDTO dto = new EmpresaDTO();
        dto = toDTO(empresa, dto);
        return dto;
    }

    public List<EmpresaDTO> getEmpresaByCnpj(String cnpj) {
        List<Empresa> empresa = new ArrayList<Empresa>(Arrays.asList(empresaRepository.findByCnpj(cnpj)));
        List<EmpresaDTO> dto = new ArrayList<EmpresaDTO>();
        dto = toDtoList(empresa);
        return dto;
    }

    public String cadastra(EmpresaDTO dto) {
        Empresa empresa = new Empresa();
        Endereco endDTO = dto.getEndereco();
        Endereco endereco = enderecoService.cadastra(endDTO);
        empresa = fromDTO(dto, empresa, endereco);
        empresaRepository.save(empresa);
        Gson gson = new Gson();
        return gson.toJson(empresa);
    }

    public String atualiza(long id, EmpresaDTO dto) {
        Empresa empresa = empresaRepository.findById(id).get();
        Endereco endereco;
        if (enderecoService.getEndereco(dto.getEndereco().getId_endereco()) != null) {
            enderecoService.atualiza(dto.getEndereco().getId_endereco(), dto.getEndereco());
            endereco = dto.getEndereco();
        } else {
            endereco = enderecoService.cadastra(dto.getEndereco());
        }
        empresa = fromDTO(dto, empresa, endereco);
        empresa  = empresaRepository.save(empresa);
        Gson gson = new Gson();
        return gson.toJson(empresa);
    }

    private EmpresaDTO toDTO(Empresa empresa, EmpresaDTO dto) {
        dto.setId(empresa.getId());
        dto.setCnpj(empresa.getCnpj());
        dto.setTipo(empresa.getTipo());
        dto.setNome(empresa.getNome());
        dto.setRazao_social(empresa.getRazao_social());
        dto.setContato(empresa.getContato());
        dto.setEmail(empresa.getEmail());
        dto.setEndereco(enderecoService.getEndereco(empresa.getId_endereco()));
        return dto;
    }

    public Empresa fromDTO(EmpresaDTO dto, Empresa empresa, Endereco endereco) {
        empresa.setCnpj(dto.getCnpj());
        empresa.setTipo(dto.getTipo());
        empresa.setNome(dto.getNome());
        empresa.setRazao_social(dto.getRazao_social());
        empresa.setContato(dto.getContato());
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

    public String delete(long id) {
        empresaRepository.deleteById(id);
        return null;
    }

    public long count(String searchString) {
        if (!searchString.isEmpty() && searchString != null)
            return empresaRepository.countFitered(searchString);
        else
            return empresaRepository.count();
    }
}