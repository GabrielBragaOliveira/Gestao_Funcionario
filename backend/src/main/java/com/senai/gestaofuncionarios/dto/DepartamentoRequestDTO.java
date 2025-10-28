/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senai.gestaofuncionarios.dto;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author Aluno
 */
public record DepartamentoRequestDTO (
    @NotBlank(message = "O nome é obrigatório e não pode ser vazio.") 
    String nome,
    
    @NotBlank(message = "A sigla é obrigatório.") 
    String sigla
) {}
