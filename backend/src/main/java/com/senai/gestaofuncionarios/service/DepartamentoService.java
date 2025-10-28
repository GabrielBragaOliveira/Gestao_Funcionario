/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.senai.gestaofuncionarios.service;

import com.senai.gestaofuncionarios.dto.DepartamentoRequestDTO;
import com.senai.gestaofuncionarios.dto.DepartamentoResponseDTO;
import com.senai.gestaofuncionarios.mapper.DepartamentoMapper;
import com.senai.gestaofuncionarios.model.Departamento;
import com.senai.gestaofuncionarios.repository.DepartamentoRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author Aluno
 */
@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private DepartamentoMapper departamentoMapper;


    public List<DepartamentoResponseDTO> listarTodos(Boolean ativos) {
        List<Departamento> departamentos;

        if (ativos != null && ativos) {
            departamentos = departamentoRepository.findByAtivoTrue();
        } else {
            departamentos = departamentoRepository.findAll();
        }

        return departamentos.stream()
                .map(departamentoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public DepartamentoResponseDTO criar(DepartamentoRequestDTO dto) {
        Optional<Departamento> existente = departamentoRepository.findByNome(dto.nome());

        if (existente.isPresent()) {
            Departamento dep = existente.get();
            if (!dep.getAtivo()) {
                dep.setSigla(dto.sigla());
                dep.setAtivo(true);
                departamentoRepository.save(dep);
                return departamentoMapper.toResponseDTO(dep);
            } else {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Já existe um departamento ativo com esse nome.");
            }
        }

        Departamento departamento = departamentoMapper.toEntity(dto);
        departamento.setAtivo(true);
        Departamento salvo = departamentoRepository.save(departamento);

        return departamentoMapper.toResponseDTO(salvo);
    }

    public DepartamentoResponseDTO buscarPorId(Long id) {
        Departamento departamento = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Departamento não encontrado com ID: " + id));

        return departamentoMapper.toResponseDTO(departamento);
    }
    
    public DepartamentoResponseDTO atualizar(Long id, DepartamentoRequestDTO dto) {
        Departamento dep = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Departamento não encontrado com ID: " + id));

        if (!dep.getAtivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Somente departamentos ativos podem ser editados.");
        }

        if (!dep.getNome().equals(dto.nome()) && departamentoRepository.existsByNome(dto.nome())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Já existe outro departamento com esse nome.");
        }

        dep.setNome(dto.nome());
        dep.setSigla(dto.sigla());
        Departamento atualizado = departamentoRepository.save(dep);

        return departamentoMapper.toResponseDTO(atualizado);
    }
    
    public void inativar(Long id) {
        Departamento departamento = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Departamento não encontrado com ID: " + id));

        if (departamento.getAtivo()) {
            departamento.setAtivo(false);
            departamentoRepository.save(departamento);
        }
    }
    
}