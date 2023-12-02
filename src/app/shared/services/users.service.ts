import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { User } from '../interfaces/user';
import { randEmail, randFullName, randUuid } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUserByUsername(email: string): Observable<User> {
    const user: User = {
      email: randEmail(),
      id: randUuid(),
      name: randFullName(),
    };

    return of(user).pipe(delay(200));
  }
}
