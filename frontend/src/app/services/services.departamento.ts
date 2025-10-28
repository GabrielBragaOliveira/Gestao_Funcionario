import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoResponse, DepartamentoRequest } from '../models/models.component';

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  private baseUrl = '/api/departamentos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(`${this.baseUrl}`);
  }

  listarAtivos(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(`${this.baseUrl}/ativos`);
  }

  criar(departamento: DepartamentoRequest): Observable<DepartamentoResponse> {
    return this.http.post<DepartamentoResponse>(this.baseUrl, departamento);
  }

  atualizar(id: number, departamento: DepartamentoRequest): Observable<DepartamentoResponse> {
    return this.http.put<DepartamentoResponse>(`${this.baseUrl}/${id}`, departamento);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/inativar`, {});
  }
}