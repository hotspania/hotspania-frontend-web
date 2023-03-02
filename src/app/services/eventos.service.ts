import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private newupdate = new Subject<any>();
  private loading = new Subject<any>();
  private close = new Subject<any>();
  private cerrarsesion = new Subject<any>();

  constructor() { }

  newUpdateAlert() {
    this.newupdate.next();
  }
  getNewupdate(): Observable<any> {
    return this.newupdate.asObservable();
  }

  logout() {
    this.cerrarsesion.next();
  }
  getCerrarSesion(): Observable<any> {
    return this.cerrarsesion.asObservable();
  }

  NewLoading() {
    this.loading.next();
  }  
  ShowLoading(status): Observable<any> {
    return this.loading.asObservable();
  }

  Closing() {
    this.close.next();
  }  
  closingDialog(): Observable<any> {
    return this.close.asObservable();
  }



  
  
}
