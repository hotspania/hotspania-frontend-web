import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminsUserService } from '../services/admins-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private us: AdminsUserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.us.validarToken()
    .pipe(
      tap( estaAutenticado =>  {
        if ( !estaAutenticado ) {   
          this.us.logout();                 
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
