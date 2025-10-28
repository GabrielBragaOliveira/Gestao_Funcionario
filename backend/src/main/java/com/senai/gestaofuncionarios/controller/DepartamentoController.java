/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senai.gestaofuncionarios.controller;

import com.senai.gestaofuncionarios.dto.DepartamentoRequestDTO;
import com.senai.gestaofuncionarios.dto.DepartamentoResponseDTO;
import com.senai.gestaofuncionarios.service.DepartamentoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Aluno
 */
@RestController
@RequestMapping("/api/v1/departamentos")
@CrossOrigin(origins = "http://localhost:4200")
public class DepartamentoController {

    @Autowired
    private DepartamentoService departamentoService;

    @GetMapping
    public ResponseEntity<List<DepartamentoResponseDTO>> listarTodos() {
        List<DepartamentoResponseDTO> departamentos = departamentoService.listarTodos(null);
        return ResponseEntity.ok(departamentos);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<DepartamentoResponseDTO>> listarAtivos() {
        List<DepartamentoResponseDTO> departamentos = departamentoService.listarTodos(true);
        return ResponseEntity.ok(departamentos);
    }

    @PostMapping
    public ResponseEntity<DepartamentoResponseDTO> criar(@RequestBody DepartamentoRequestDTO dto) {
        DepartamentoResponseDTO criado = departamentoService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartamentoResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody DepartamentoRequestDTO dto) {
        DepartamentoResponseDTO atualizado = departamentoService.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }
    
    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        departamentoService.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
