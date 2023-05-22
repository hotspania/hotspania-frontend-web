import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Global } from './global';
import { LocalStorageService } from './local-storage.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ToolsService } from './tools.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url: String;
  public token: any;

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private tool: ToolsService,
    private router: Router
  ) {
    this.url = Global.url;
    //this.url = "http://localhost:3500/web/";
  }

  validToken(): Observable<any> {
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders().set('x-token', this.token);
    return this.http.get(this.url + 'tokenstatus', { headers: headers });
  }

  async readyToken() {
    let x = await this.validToken().subscribe(
      (x) => x,
      (e: any) => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        this.tool.ShowError('TU SESSION HA EXPIRADO VOLVER A INGRESAR');
        this.router.navigate(['/login']);
      }
    );
  }

  // applogin
  applogin(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    let data = JSON.stringify(a);
    return this.http.post(this.url + 'applogin', data, { headers: headers }).pipe(
      map((resp: any) => {
        this.ls.SaveStorage('usuario', resp.usuarioDB);
        return resp.ok;
      })
    );
  }

  getFichas(id,state?): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let $params = new HttpParams();
    !!state ? ($params = $params.append('status', state)) : '';
    return this.http.get(this.url + 'listado/' + id, { headers: headers,params: $params });
  }

  getFicha(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'profile/' + id, { headers: headers });
  }



  checkFace(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'checkface', data, { headers: headers });
  }

  getProfile(id): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getprofileanuncio/' + id, {
      headers: headers,
    });
  }

  getFakeFicha(id): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getprofile/' + id, { headers: headers });
  }

  updateProfilePhotos(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'updateimagesprofile', data, {
      headers: headers,
    });
  }

  setListados(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'setlistados', data, { headers: headers });
  }

  makeonline(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'makeonline', data, { headers: headers });
  }
  getTimeOnline(id): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getonline/' + id, { headers: headers });
  }

  getZones(): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getzones', { headers: headers });
  }
  getPeticiones(id): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getonepeticiones/' + id, {
      headers: headers,
    });
  }

  putFakeData(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'fakecreate', data, { headers: headers });
  }

  sendpeticion(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'addpeticion', data, { headers: headers });
  }

  getComprasUser(id: any): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getcompras/' + id, { headers: headers });
  }
  getIngresosUser(id: any): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getingresos/' + id, { headers: headers });
  }
  getfinanzasprofile(id): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getprofilefinanzas/' + id, {
      headers: headers,
    });
  }
  getLastInputs(): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getlastinputs', { headers: headers });
  }
  getLastOutputs(): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getlastoutputs', { headers: headers });
  }

  //IMAGBES
  getImagesUser(id,status,tipo): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getimagesuser/' + id +'/'+status+'/'+ tipo, {
      headers: headers,
    });
  }
  deleteImagen(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'deleteimage', data, { headers: headers });
  }
  putSpecs(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'pushspecs', data, { headers: headers });
  }

  //noticias
  getNoticias(): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.get(this.url + 'getnoticias', { headers: headers });
  }

  setstates(a): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let data = JSON.stringify(a);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.post(this.url + 'setstates', data, { headers: headers });
  }

  deleteonlinetime(id): Observable<any> {
    this.readyToken();
    this.token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);
    return this.http.delete(this.url + 'deleteonline/' + id, {
      headers: headers,
    });
  }
}
