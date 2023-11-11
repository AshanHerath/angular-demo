import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-demo';
  isLoginDisplayed: any = 'none';
  isRegisterDisplayed: any = 'none';

  constructor(private userService: UserService) {
  }

  toggleDisplay(check:any) {
    if (check == 'login'){
      this.isLoginDisplayed = 'flex'
    } else {
      this.isRegisterDisplayed = 'flex'
    }

  }


  noneDisplay(check:any) {

    if (check == 'login'){
      this.isLoginDisplayed = 'none';
      this.clearLogin();
    } else {
      this.isRegisterDisplayed = 'none';
      this.clearRegister();
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rePassword: new FormControl('', [Validators.required]),
  });

  logIn() {
    console.log(this.loginForm.value);

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log(email, password);

    this.userService.userLogin(email, password)
      .then(user => {
        console.log('User logged in successfully', user);
      }).catch(error => {
        console.log('Login failed', error);
    })

  }

  register() {
    console.log(this.registerForm.value);

    const password = this.registerForm.get('password')?.value;
    const rePassword = this.registerForm.get('rePassword')?.value;

    if (password == rePassword) {
      let newUser = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: password
      };

      this.userService.newUserRegister(newUser).subscribe({
        next: (response) => {
          console.log('User added successfully');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // This block will be executed when the Observable completes (optional)
        }
      });
    } else {
      console.log('Passwords do not match');
    }
  }


  clearLogin() {
    this.loginForm.get('email')?.setValue('');
    this.loginForm.get('password')?.setValue('');
  }

  clearRegister(){
    this.registerForm.get('name')?.setValue('');
    this.registerForm.get('email')?.setValue('');
    this.registerForm.get('password')?.setValue('');
    this.registerForm.get('rePassword')?.setValue('');
  }



}
