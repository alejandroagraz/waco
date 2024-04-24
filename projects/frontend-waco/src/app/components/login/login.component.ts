import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { Login } from '../../models/login';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  public access_token: string = '';
  public login: Login;

  constructor(private _authenticationService: AuthenticationService, private router: Router) {
    this.login = new Login('', '');
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authenticate(this.login.username, this.login.password)
  }

  authenticate(username: string,password: string) {
    this._authenticationService.login(username,password).subscribe((resp:any) => {
        if (resp) {
          this.access_token = resp.access_token;
          if (this.access_token != '') {
            window.localStorage.setItem('access_token', resp.access_token);
            this.router.navigate(['/home']);
          }
        }
      },
      err => {
        Swal.fire(
          'Ocurrio un error!!',
          err.error.message[0],
          'error'
        );
      }
    );
  }
}

