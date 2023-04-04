import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Global } from './global';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  public apiUrl: String;
  token: string = '';

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private router: Router,
  ) {
    this.apiUrl = Global.urlimages;
    this.apiUrl = 'http://localhost:3500/api/';
  }


  registerFakeData(form: any): Observable<any> {
    const data = JSON.stringify(form);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + `fakecreate`, data, { headers: headers });
  }

  registerRealData(form): Observable<any> {
    const data = JSON.stringify(form);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + 'usercreate', data, { headers: headers });
  }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise(async (resolve, reject) => {
      const formData: FormData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('archivo', archivo);   
      var data = { content: formData };
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };

      let url =this.apiUrl +'upload/' + tipo + '/' + id;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  registerFiles(archivos: Array<File>, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      let xhr = new XMLHttpRequest();

      for (let i = 0; i < archivos.length; i++) {
        formData.append('archivo', archivos[i]);
      }

      let data = { content: formData };
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };
      let url = this.apiUrl + 'uploads/' + tipo + '/' + id;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  existEmail(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + `checkemailuser/${email}`, { headers: headers });
  }

  existUsername(username: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + `checkusername/${username}`, { headers: headers });
  }
}
