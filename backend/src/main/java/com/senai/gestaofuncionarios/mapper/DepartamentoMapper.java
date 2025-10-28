/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senai.gestaofuncionarios.mapper;

import com.senai.gestaofuncionarios.dto.DepartamentoRequestDTO;
import com.senai.gestaofuncionarios.dto.DepartamentoResponseDTO;
import com.senai.gestaofuncionarios.model.Departamento;
import org.springframework.stereotype.Component;

/**
 *
 * @author Aluno
 */

@Component
public class DepartamentoMapper {


    public Departamento toEntity(DepartamentoRequestDTO dto) {
        if (dto == null) return null;

        Departamento departamento = new Departamento();
        departamento.setNome(dto.nome());
        departamento.setSigla(dto.sigla());

        return departamento;
    }

    public DepartamentoResponseDTO toResponseDTO(Departamento departamento) {
        if (departamento == null) return null;

        return new DepartamentoResponseDTO(
                departamento.getId(),
                departamento.getNome(),
                departamento.getSigla(),
                departamento.getAtivo()
        );
    }
}