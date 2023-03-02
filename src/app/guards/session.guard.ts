import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminsUserService } from '../services/admins-user.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router, private us: AdminsUserService,private ls:LocalStorageService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.ls.cargarStorage('token').then((x:any)=>{
        this.router.navigate([`/login`]);
        return false;
      }).catch(e=>true);
  }
}
