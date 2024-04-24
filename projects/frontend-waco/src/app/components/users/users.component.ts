import { Component, OnInit } from '@angular/core';
import { Users} from "../../models/users";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";
import {Meta} from "../../models/meta";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users:  Users;
  constructor(private _usersService: UsersService) {
    this.users = new Users([
      new User('','','','','','','',''
      )],
      new Meta(0,0,0,0,false,false)
    );
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this._usersService.getUsers().subscribe((resp:any) => {
        if (resp) {
          this.users = resp;
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
