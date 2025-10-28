/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senai.gestaofuncionarios.dto;

/**
 *
 * @author Aluno
 */
public record DepartamentoResponseDTO (
    Long id, 
    String nome,
    String sigla,
    Boolean ativo
) {}

