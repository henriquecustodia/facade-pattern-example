import { Injectable, computed, signal } from '@angular/core';
import { User } from '../interfaces/user';

type State = User | null;

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  #state = signal<State>(null);

  setState(state: State) {
    this.#state.set(state);
  }

  getState() {
    return this.#state();
  }

  isLoggedIn() {
    return this.#state() !== null;
  }

}
