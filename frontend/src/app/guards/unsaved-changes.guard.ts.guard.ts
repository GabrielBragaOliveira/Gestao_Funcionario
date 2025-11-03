import { CanDeactivateFn } from '@angular/router';
import { FuncionarioFormComponent } from '../components/funcionario-form/funcionario-form.component';

export const unsavedChangesGuardTsGuard: CanDeactivateFn<FuncionarioFormComponent> = (component) => {
  if (!component.isSalvo) {
    const confirmacao = confirm("Seus dados não foram salvos. Deseja retornar assim mesmo?");
    return confirmacao;
  }
  return component.canDeactivate ? component.canDeactivate() : true;
};