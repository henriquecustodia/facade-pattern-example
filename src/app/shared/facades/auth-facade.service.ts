import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { LoggedUserService } from '../stores/logged-user.service';
import { User } from '../interfaces/user';

interface LoginParams {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  usersService = inject(UsersService);
  loggedUserService = inject(LoggedUserService);
  authService = inject(AuthService);

  login({ username, password }: LoginParams): Observable<User> {
    return this.authService
      .login({
        username,
        password,
      })
      .pipe(
        switchMap(() => {
          return this.usersService.getUserByUsername(username);
        }),
        tap((user) => {
          this.loggedUserService.setState(user);
        })
      );
  }
}
