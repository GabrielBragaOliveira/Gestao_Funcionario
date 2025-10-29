import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoResponse, DepartamentoRequest } from '../models/models.component';

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  private apiUrl = 'http://localhost:8084/api/v1/departamentos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(`${this.apiUrl}`);
  }

  listarAtivos(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(`${this.apiUrl}/ativos`);
  }

  criar(departamento: DepartamentoRequest): Observable<DepartamentoResponse> {
    return this.http.post<DepartamentoResponse>(this.apiUrl, departamento);
  }

  atualizar(id: number, departamento: DepartamentoRequest): Observable<DepartamentoResponse> {
    return this.http.put<DepartamentoResponse>(`${this.apiUrl}/${id}`, departamento);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/inativar`, {});
  }
}