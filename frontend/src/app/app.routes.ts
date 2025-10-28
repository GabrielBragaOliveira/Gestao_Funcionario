import { Routes } from '@angular/router';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario.componet';
import { DepartamentoFormComponent } from './components/departamento-form/departamento-form.component';
import { DepartamentoListComponent } from './components/departamento-list/departamento-list.component';
export const routes: Routes = [

  { path: 'funcionarios', component: FuncionarioListComponent },
  { path: 'funcionarios/novo', component: FuncionarioFormComponent },
  { path: 'funcionarios/editar/:id', component: FuncionarioFormComponent },

  { path: 'departamentos', component: DepartamentoListComponent },
  { path: 'departamentos/novo', component: DepartamentoFormComponent },
  { path: 'departamentos/editar/:id', component: DepartamentoFormComponent },

  { path: '', redirectTo: '/funcionarios', pathMatch: 'full' },
  { path: '**', redirectTo: '/funcionarios' }
];