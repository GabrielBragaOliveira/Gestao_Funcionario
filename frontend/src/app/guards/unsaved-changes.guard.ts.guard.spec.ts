import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { unsavedChangesGuardTsGuard } from './unsaved-changes.guard.ts.guard';
import { FuncionarioFormComponent } from '../components/funcionario-form/funcionario-form.component'; // Correct import

describe('unsavedChangesGuardTsGuard', () => {
  const executeGuard: CanDeactivateFn<FuncionarioFormComponent> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unsavedChangesGuardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});