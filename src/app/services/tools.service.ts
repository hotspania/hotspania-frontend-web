import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private router:Router) {}

  ShowSuccess(message?: string) {
    return Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Hecho !!',
      showConfirmButton: false,
      timer: 1500,
      text: message || ""
    });
  }

  ShowError(message: string) {
  return  Swal.fire({
      icon: 'error',
      title: 'Error !!',
      text: message,
    });
  }
  ShowCameraError(message: string) {
    return  Swal.fire({
        icon: 'error',
        title: 'Error !!',
        text: message,
        showCancelButton: false,
        showConfirmButton:true,
        confirmButtonText: 'Volver a Intentarlo'
      }).then(x=>{
        if(x.isConfirmed){
          this.router.navigate(['/login']);
        }
      });
    }

  ShowLogin() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Haz Ingresado Correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
