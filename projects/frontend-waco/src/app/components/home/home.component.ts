import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UsersService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public sub_title: string;
  public users = [];

  constructor(
    private _usersService: UsersService
  ) {

    this.title = 'HN Feed';
    this.sub_title = 'We <3 hacker news!';

  }

  ngOnInit(): void {
      // this.getUsers()
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
