import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IntroComponent } from './pages/intro/intro.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { FichasComponent } from './pages/fichas/fichas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { AccountComponent } from './pages/account/account.component';
import { NavbarAccountComponent } from './components/navbar-account/navbar-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import {WebcamModule} from 'ngx-webcam';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { CaptureImageComponent } from './components/capture-image/capture-image.component';
import { MyimagesComponent } from './pages/myimages/myimages.component';
import { MisdatosComponent } from './pages/misdatos/misdatos.component';
import { MismensajesComponent } from './pages/mismensajes/mismensajes.component';
import { MisfinanzasComponent } from './pages/misfinanzas/misfinanzas.component';
import { MispeticionesComponent } from './pages/mispeticiones/mispeticiones.component';
import { AllfotosComponent } from './components/allfotos/allfotos.component';
import { SubirfotosComponent } from './components/subirfotos/subirfotos.component';
import { FotoslistadoComponent } from './components/fotoslistado/fotoslistado.component';
import { FotoperfilComponent } from './components/fotoperfil/fotoperfil.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import { CommonModule } from '@angular/common';
import { SpeedDialFabComponent } from './components/speed-dial-fab/speed-dial-fab.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './components/news/news.component';
import { PeticionComponent } from './components/peticion/peticion.component';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IntroComponent,
    LoginComponent,
    CategoriasComponent,
    FichasComponent,
    ProfileComponent,
    LogoComponent,
    NavbarComponent,
    FichaComponent,
    AccountComponent,
    NavbarAccountComponent,
    LobbyComponent,
    ModalLoginComponent,
    GalleryComponent,
    ImagenComponent,
    CaptureImageComponent,
    MyimagesComponent,
    MisdatosComponent,
    MismensajesComponent,
    MisfinanzasComponent,
    MispeticionesComponent,
    AllfotosComponent,
    SubirfotosComponent,
    FotoslistadoComponent,
    FotoperfilComponent,
    ImageContainerComponent,
    ModalImageComponent,
    SpeedDialFabComponent,
    NewsComponent,
    PeticionComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    WebcamModule,
    CommonModule,
    MatButtonModule,    
    HttpClientModule,
    SlickCarouselModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
