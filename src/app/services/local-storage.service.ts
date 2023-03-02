import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  SaveStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  cargarStorage(key: string) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(key)) {
        resolve(JSON.parse(localStorage.getItem(key)));
      } else {
        reject('storage vacio');
      }
    });
  }

  eliminarStorage(key: string) {
    localStorage.removeItem(key);
  }
}
