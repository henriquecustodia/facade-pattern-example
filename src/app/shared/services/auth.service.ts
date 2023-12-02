import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

interface LoginParams {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login({ username, password }: LoginParams) {
    return of({ success: true }).pipe(delay(200));
  }
}
