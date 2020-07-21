package com.otimo.desafio.controller;

import com.otimo.desafio.model.Endereco;
import com.otimo.desafio.service.EnderecoService;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import com.google.gson.Gson;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/endereco", produces = MediaType.APPLICATION_JSON_VALUE)
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping(path = "/{id}")
    public Endereco getEndereco(@PathVariable String id) {
        return enderecoService.getEndereco(Long.parseLong(id));
    }

    @PostMapping
    public String cadastraEndereco(@RequestBody String Endereco)
            throws ParseException, UnsupportedEncodingException {
        String decodedQuery = URLDecoder.decode(Endereco, "UTF-8");
        decodedQuery = decodedQuery.replace("=", "");
        Gson gson = new Gson();
        Type type = new TypeToken<Endereco>() {
        }.getType();
        Endereco endereco = gson.fromJson(decodedQuery, type);
        return gson.toJson(enderecoService.cadastra(endereco));
    }

    @PutMapping(value = "/{id}")
    public String atualizaEndereco(@PathVariable Long id, @RequestBody Endereco Endereco) {
        Gson gson = new Gson();
        return gson.toJson(enderecoService.atualiza(id, Endereco));
    }

    @DeleteMapping(path = "/{id}")
    public String deleteEndereco(@PathVariable Long id) {
        return enderecoService.delete(id);
    }

}