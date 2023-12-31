import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoggedUserService } from './shared/stores/logged-user.service';
import { AuthFacadeService } from './shared/facades/auth-facade.service';

@Component({
  selector: 'app-root',
  template: `
    @if (!isLoggedIn()) {
    <form [formGroup]="form" (ngSubmit)="login()">
      <fieldset>
        <label for="username">Username</label>
        <input name="username" type="text" formControlName="username" />
      </fieldset>

      <fieldset>
        <label for="password">Password</label>
        <input name="password" type="password" formControlName="password" />
      </fieldset>

      <button type="submit">Login</button>
    </form>
    } @else {
    <strong>Congrats! You're authenticated ;)</strong>
    }
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  authFacadeService = inject(AuthFacadeService);
  loggedUserService = inject(LoggedUserService);

  form = new FormGroup({
    username: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  isLoggedIn = computed(() => this.loggedUserService.isLoggedIn());

  login() {
    const username = this.form.controls.username.value;
    const password = this.form.controls.password.value;

    this.authFacadeService.login({ username, password }).subscribe(() => {});
  }
}
