import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DepartamentoService } from '../../services/services.departamento';
import { DepartamentoResponse } from '../../models/models.component';
import { DepartamentoFormComponent } from '../departamento-form/departamento-form.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departamento-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, MessagesModule, DialogModule, FormsModule, DepartamentoFormComponent],
  templateUrl: './departamento-list.component.html',
  providers: [MessageService]
})
export class DepartamentoListComponent implements OnInit {

  departamentos: DepartamentoResponse[] = [];
  carregando = false;
  mostrarForm = false;
  departamentoParaEditar?: DepartamentoResponse;

  constructor(private departamentoService: DepartamentoService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    this.carregando = true;
    this.departamentoService.listarTodos().subscribe({
      next: data => { this.departamentos = data; this.carregando = false; },
      error: () => { this.messageService.add({severity:'error', summary:'Erro', detail:'Não foi possível carregar departamentos'}); this.carregando = false; }
    });
  }

  editar(dep: DepartamentoResponse): void {
    this.departamentoParaEditar = dep;
    this.mostrarForm = true;
  }

  inativar(dep: DepartamentoResponse): void {
    this.departamentoService.inativar(dep.id).subscribe({
      next: () => { this.messageService.add({severity:'success', summary:'Sucesso', detail:'Departamento inativado'}); this.listarTodos(); },
      error: () => { this.messageService.add({severity:'error', summary:'Erro', detail:'Não foi possível inativar'}); }
    });
  }

  fecharForm(): void {
    this.mostrarForm = false;
    this.departamentoParaEditar = undefined;
    this.listarTodos();
  }

}