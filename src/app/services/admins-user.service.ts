import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Global } from './global';
import { map, tap, catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { EventosService } from './eventos.service';

@Injectable({
  providedIn: 'root',
})
export class AdminsUserService {
  public url: String;
  token: string = '';

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private router: Router,
    private eventos:EventosService
  ) {
    this.url = Global.url;
    this.cargarStorage();
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders().set('x-token', token);
    return this.http
      .get(this.url + 'tokenstatus', {
        headers: headers,
      })
      .pipe(
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  Login(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', data, { headers: headers }).pipe(
      map((resp: any) => {
        this.ls.SaveStorage('usuario', resp.usuarioDB);
        return resp.ok;
      })
    );
  }

  LoginTwo(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'logintwo', data, { headers: headers }).pipe(
      map((resp: any) => {
        this.ls.SaveStorage('usuario', resp.usuarioDB);
        localStorage.setItem('token', resp.token);       
        return resp.ok;
      })
    );
  }

  CheckEmail(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'admincheck/' + id, { headers: headers });
  }

  logout() {
    this.ls.eliminarStorage('token');
    this.ls.eliminarStorage('usuario');
    this.eventos.logout();
  }

  checkEmail(email: String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'admincheck/' + email, {
      headers: headers,
    });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  Logeado() {
    return this.token.length > 5 ? true : false;
  }
}
