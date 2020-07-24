package com.otimo.desafio.controller;

import java.text.ParseException;

import com.otimo.desafio.model.dto.EmpresaDTO;
import com.otimo.desafio.service.EmpresaService;

import com.google.gson.Gson;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLDecoder;

import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/empresa", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping(path = "")
    public Page<EmpresaDTO> getEmpresas(@RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "5") int size) {
        return empresaService.findAll(page, size);
    }

    @GetMapping("/filter")
    public Page<EmpresaDTO> search(@RequestParam("searchTerm") String searchTerm,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "5") int size) {
        return empresaService.search(searchTerm, page, size);
    }

    @GetMapping(path = "/{cnpj}")
    public EmpresaDTO getEmpresa(@PathVariable String cnpj) {
        return empresaService.getEmpresa(cnpj);
    }

    @GetMapping(path = "/count")
    public long count(@RequestParam(value = "searchTerm", required = false, defaultValue = "") String searchTerm) {
        return empresaService.count(searchTerm);
    }

    @PostMapping
    public String cadastraEmpresa(@RequestBody String Empresa) throws ParseException, UnsupportedEncodingException {
        String decodedQuery = URLDecoder.decode(Empresa, "UTF-8");
        decodedQuery = decodedQuery.replace("=", "");
        Gson gson = new Gson();
        Type type = new TypeToken<EmpresaDTO>() {
        }.getType();
        EmpresaDTO empresa = gson.fromJson(decodedQuery, type);
        return empresaService.cadastra(empresa);
    }

    @PutMapping(value = "/{cnpj}")
    public String atualizaEmpresa(@PathVariable String cnpj, @RequestBody EmpresaDTO Empresa) {
        return empresaService.atualiza(cnpj, Empresa);
    }

    @DeleteMapping(path = "/{cnpj}")
    public String deleteEmpresa(@PathVariable String cnpj) {
        return empresaService.delete(cnpj);
    }
}