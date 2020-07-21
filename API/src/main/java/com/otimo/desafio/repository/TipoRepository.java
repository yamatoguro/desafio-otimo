package com.otimo.desafio.repository;

import com.otimo.desafio.model.Tipo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {

	Tipo findByDescricao(String descricao);

}