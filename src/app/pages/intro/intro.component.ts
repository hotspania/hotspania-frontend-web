import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsUserService } from 'src/app/services/admins-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private ls:LocalStorageService,private router:Router,private as:AdminsUserService) { }

  ngOnInit(): void {
    this.getInit();   
  }

  getInit(){
    (this.as.Logeado())?( this.router.navigate(['/login'])):null
  }


}
