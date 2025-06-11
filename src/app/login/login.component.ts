import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onChange() {
    console.log('username', this.loginForm.value.username);
    console.log('password', this.loginForm.value.password);
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;
    const storedUser = localStorage.getItem('authUser');

    if (!storedUser) {
      localStorage.setItem('authUser', JSON.stringify({
        name: formValue.username,
        password: formValue.password
      }));
      this.router.navigate(['dashboard']);
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (
        parsedUser.name === formValue.username &&
        parsedUser.password === formValue.password
      ) {
        this.router.navigate(['dashboard']);
      } else {
        alert('Invalid username or password');
      }
    }
  }
}
