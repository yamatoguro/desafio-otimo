package com.otimo.desafio.repository;

import com.otimo.desafio.model.Empresa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    @Query("FROM Empresa e " + "WHERE e.cnpj like %:searchTerm% " + "OR LOWER(e.nome) like %:searchTerm%")
    Page<Empresa> search(@Param("searchTerm") String searchTerm, Pageable pageable);

    Empresa findByCnpj(String cnpj);

}