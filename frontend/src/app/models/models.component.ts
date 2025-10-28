export interface FuncionarioResponse{
  id: number;
  nome: string;
  email: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
  ativo: boolean;
  departamento?: DepartamentoResponse;
}

export interface FuncionarioRequest {
  nome: string;
  email: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
  ativo: boolean;
}

export interface DepartamentoResponse{
  id: number;
  nome: string;
  sigla: string;
  ativo: boolean;
}

export interface DepartamentoRequest {
  nome: string;
  sigla: string;
  ativo: boolean;
}