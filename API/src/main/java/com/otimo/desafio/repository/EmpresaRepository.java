package com.otimo.desafio.repository;

import com.otimo.desafio.model.Empresa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    @Query("SELECT e FROM Empresa e WHERE e.cnpj LIKE %?1% or LOWER(e.nome) LIKE %?1%")
    Page<Empresa> search(String searchTerm, Pageable pageable);

    Empresa findByCnpj(String cnpj);
}