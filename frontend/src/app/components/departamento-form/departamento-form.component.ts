import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DepartamentoService } from '../../services/services.departamento';
import { DepartamentoRequest, DepartamentoResponse } from '../../models/models.component';

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule, MessagesModule],
  templateUrl: './departamento-form.component.html',
  providers: [MessageService]
})
export class DepartamentoFormComponent implements OnInit {

  @Input() departamentoParaEditar?: DepartamentoResponse;
  departamento: DepartamentoRequest = { nome: '', sigla: '', ativo: true };
  carregando = false;

  constructor(private departamentoService: DepartamentoService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    if (this.departamentoParaEditar) {
      this.departamento = {
        nome: this.departamentoParaEditar.nome,
        sigla: this.departamentoParaEditar.sigla,
        ativo: this.departamentoParaEditar.ativo
      };
    }
  }

  salvar(): void {
    if (!this.departamento.nome || !this.departamento.sigla) {
      this.messageService.add({severity:'warn', summary:'Aviso', detail:'Preencha todos os campos'});
      return;
    }

    this.carregando = true;

    if (this.departamentoParaEditar) {
      this.departamentoService.atualizar(this.departamentoParaEditar.id, this.departamento)
        .subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Departamento atualizado'});
            this.carregando = false;
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:'Erro', detail: err.error?.message || 'Erro ao atualizar departamento'});
            this.carregando = false;
          }
        });
    } else {
      this.departamentoService.criar(this.departamento)
        .subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Departamento criado'});
            this.departamento = { nome: '', sigla: '', ativo: true };
            this.carregando = false;
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:'Erro', detail: err.error?.message || 'Erro ao criar departamento'});
            this.carregando = false;
          }
        });
    }
  }

}