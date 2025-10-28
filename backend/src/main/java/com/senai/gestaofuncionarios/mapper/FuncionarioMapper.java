/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senai.gestaofuncionarios.mapper;

import com.senai.gestaofuncionarios.dto.FuncionarioRequestDTO;
import com.senai.gestaofuncionarios.dto.FuncionarioResponseDTO;
import com.senai.gestaofuncionarios.model.Funcionario;
import com.senai.gestaofuncionarios.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Aluno
 */
@Component
public class FuncionarioMapper {
    
    @Autowired
    private DepartamentoRepository departamentoRepository;
    
    @Autowired
    private DepartamentoMapper departamentoMapper;

    public Funcionario toEntity(FuncionarioRequestDTO dto) {
        if (dto == null) return null;

        Funcionario funcionario = new Funcionario();
        funcionario.setNome(dto.nome());
        funcionario.setEmail(dto.email());
        funcionario.setCargo(dto.cargo());
        funcionario.setSalario(dto.salario());
        funcionario.setDataAdmissao(dto.dataAdmissao());
        funcionario.setAtivo(dto.ativo());

        funcionario.setDepartamento(
            departamentoRepository.findById(dto.departamentoId())
                .orElseThrow(() -> new IllegalArgumentException("Departamento não encontrado com o ID informado."))
        );
        return funcionario;
    }

    public FuncionarioResponseDTO toResponseDTO(Funcionario funcionario) {
        if (funcionario == null) return null;

        return new FuncionarioResponseDTO(
            funcionario.getId(),
            funcionario.getNome(),
            funcionario.getEmail(),
            funcionario.getCargo(),
            funcionario.getSalario(),
            funcionario.getDataAdmissao(),
            funcionario.getAtivo(),
            departamentoMapper.toResponseDTO(funcionario.getDepartamento())
        );
    }
}