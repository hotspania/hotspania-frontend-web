import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';

import { FichasComponent } from './pages/fichas/fichas.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { MyimagesComponent } from './pages/myimages/myimages.component';
import { MisdatosComponent } from './pages/misdatos/misdatos.component';
import { MismensajesComponent } from './pages/mismensajes/mismensajes.component';
import { MisfinanzasComponent } from './pages/misfinanzas/misfinanzas.component';
import { MispeticionesComponent } from './pages/mispeticiones/mispeticiones.component';
import { LoginGuard } from './guards/login.guard';
import { SessionGuard } from './guards/session.guard';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  {
    path: 'whileapp/:id/:token',
    component: HomeComponent,
  },
  {
    path: 'chicas/:categoria',
    component: FichasComponent,
  },
  {
    path: ':user/perfil',
    component: ProfileComponent,
  },
  {
    path: 'login',   
    component: LoginComponent,
  },
  {
    path: 'lobby/:id',   
    component: LobbyComponent,
  },
  {
    path: 'account/:id',
    canActivate:[LoginGuard],
    component: AccountComponent,
  },
  {
    path: 'misimages/:id',
    canActivate:[LoginGuard],
    component: MyimagesComponent,
  },
  {
    path: 'misdatos/:id',
    canActivate:[LoginGuard],
    component: MisdatosComponent,
  },
  {
    path: 'mismensajes/:id',
    canActivate:[LoginGuard],
    component: MismensajesComponent,
  },
  {
    path: 'misfinanzas/:id',
    canActivate:[LoginGuard],
    component: MisfinanzasComponent,
  },
  {
    path: 'mispeticiones/:id',
    canActivate:[LoginGuard],
    component: MispeticionesComponent,
  },
  {
    path: 'chicas/barcelona',
    canActivate:[LoginGuard],
    component: MispeticionesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules,scrollPositionRestoration:'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
