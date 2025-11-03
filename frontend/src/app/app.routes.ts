import { Routes } from '@angular/router';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario.componet';
import { DepartamentoFormComponent } from './components/departamento-form/departamento-form.component';
import { DepartamentoListComponent } from './components/departamento-list/departamento-list.component';
import { authGuardTsGuard } from './guards/auth.guard.ts.guard';
import { unsavedChangesGuardTsGuard } from './guards/unsaved-changes.guard.ts.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'funcionarios',
    component: FuncionarioListComponent,
    canActivate: [authGuardTsGuard],  
  },
  {
    path: 'funcionarios/novo',
    component: FuncionarioFormComponent,
    canActivate: [authGuardTsGuard], 
    canDeactivate: [unsavedChangesGuardTsGuard],  
  },
  {
    path: 'funcionarios/editar/:id',
    component: FuncionarioFormComponent,
    canActivate: [authGuardTsGuard],  
    canDeactivate: [unsavedChangesGuardTsGuard],  
  },

  {
    path: 'departamentos',
    component: DepartamentoListComponent,
    canActivate: [authGuardTsGuard],  
  },
  {
    path: 'departamentos/novo',
    component: DepartamentoFormComponent,
    canActivate: [authGuardTsGuard], 
    canDeactivate: [unsavedChangesGuardTsGuard],  
  },
  {
    path: 'departamentos/editar/:id',
    component: DepartamentoFormComponent,
    canActivate: [authGuardTsGuard],
    canDeactivate: [unsavedChangesGuardTsGuard],  
  },
  { path: '', redirectTo: '/funcionarios', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/funcionarios' }, 
];