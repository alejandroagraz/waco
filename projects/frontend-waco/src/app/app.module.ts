import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import {LoginComponent} from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthGuard} from "./guards/auth-guard.service";
import {HttpClientModule} from "@angular/common/http";
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { UserComponent } from './components/user/user.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { JwtModule } from "@auth0/angular-jwt";
import {RouterModule} from "@angular/router";
import {MomentModule} from "ngx-moment";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    SliderComponent,
    SidebarComponent,
    UsersComponent,
    FormularioComponent,
    UserComponent,
    PokemonsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:3000"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
