package com.otimo.desafio.model.dto;

import com.otimo.desafio.model.Endereco;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaDTO {
    private long id;
    private String cnpj;
    private String tipo;
    private String nome;
    private String razao_social;
    private String contato;
    private String email;
    private Endereco endereco;
}