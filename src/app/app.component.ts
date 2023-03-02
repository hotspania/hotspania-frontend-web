import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webPlanetaRelax';

  constructor(public router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){

        // console.log(event.urlAfterRedirects);
        gtag('config', 'G-FYEGLPQNT7', {'page_path': event.urlAfterRedirects,'page_title':event.urlAfterRedirects});
      }
    })
  }
  
  



}
