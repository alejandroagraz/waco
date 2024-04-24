import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HomeComponent]
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear()
    this.router.navigate(['']);
    window.location.replace("");
  }

}
