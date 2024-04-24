import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './guards/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {UsersComponent} from './components/users/users.component';
import {FormularioComponent} from './components/formulario/formulario.component';
import {PokemonsComponent} from './components/pokemons/pokemons.component';
import {UserComponent} from './components/user/user.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'user/new', component: FormularioComponent, canActivate: [AuthGuard]},
  {path: 'pokemons', component: PokemonsComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
