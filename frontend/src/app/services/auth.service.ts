import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'authToken';

  login(email: string, password: string): boolean {
    if (email === 'test@example.com' && password === '123456') {
      localStorage.setItem(this.TOKEN_KEY, 'mockToken');
      localStorage.setItem('currentUser', JSON.stringify({ username: 'Usuário' }));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
