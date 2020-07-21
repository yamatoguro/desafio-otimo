package com.otimo.desafio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Component
@Table(name = "empresa")
public class Empresa {

    @Id
    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "id_tipo")
    private Long id_tipo;

    @Column(name = "nome")
    private String nome;

    @Column(name = "razao_social")
    private String razao_social;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;

    @Column(name = "id_endereco")
    private Long id_endereco;
}