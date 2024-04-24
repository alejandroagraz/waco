import { Component, OnInit } from '@angular/core';
import {UserNew} from "../../models/user-new";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public userNew: UserNew
  public page_title: string;
  constructor(
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.userNew = new UserNew('','','','','','');
    this.page_title = 'Crear nuevo usuario';
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._usersService.userCreate(this.userNew).subscribe(
      resp => {
        if (resp) {
          Swal.fire(
            'Usuario creado!!',
            'El usuario se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/users']);
        } else {
          Swal.fire(
            'Creacion fallida!!',
            'El usuario no se ha creado correctamente',
            'error'
          );
        }
      },
      err => {
        const message: string = err.error.statusCode && err.error.statusCode == 400 ? err.error.message[0] : err.error.message;
        Swal.fire(
          'Ocurrio un error!!',
          message,
          'error'
        );
      }
    );
  }

}
