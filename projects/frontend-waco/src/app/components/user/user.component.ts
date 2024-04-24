import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";
import {UserFavorites} from "../../models/user-favorites";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user:  User;
  public userFavorites : UserFavorites[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usersService: UsersService
  ) {
    this.user = new User('', '', '', '', '', '', '', '');
    this.userFavorites = [
      new UserFavorites('','','','',''
    )];
  }

  ngOnInit(){
    this.getUser();
    this.getUserFavorites();
  }

  getUser(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._usersService.getUser(id).subscribe(
        resp => {
          if(resp){
            this.user = resp;
          }else{
            this._router.navigate(['/home']);
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

    });
  }

  getUserFavorites(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._usersService.getUserFavorites(id).subscribe(
        resp => {
          if(resp.data){
            this.userFavorites = resp.data;
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

    });
  }

  removeUser(id: string){
    this._route.params.subscribe(params => {
      this._usersService.removeUser(id).subscribe(
        resp => {
          if(resp.status == 200){
            Swal.fire(
              'Eliminar usuario',
              'El usuario se ha eliminado correctamente',
              'success'
            );
            this._router.navigate(['/home']);
          } else {
            Swal.fire(
              'Eliminacion fallida!!',
              'El usuario no se ha podido eliminar correctamente',
              'error'
            );
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
    });
  }

  removeFavoriteUser(id: string){
    this._route.params.subscribe(params => {
      this._usersService.removeFavoriteUser(id).subscribe(
        resp => {
          if(resp.status == 200){
            this.getUserFavorites();
            Swal.fire(
              'Eliminar pokemon',
              'El pokemon se ha eliminado de los favoritos correctamente',
              'success'
            );
          } else {
            Swal.fire(
              'Eliminacion fallida!!',
              'El pokemon no se ha podido eliminar correctamente',
              'error'
            );
          }
        },
        err => {
          Swal.fire(
            'Ocurrio un error!!',
            err.error.message,
            'error'
          );
        }
      );
    });
  }
}
