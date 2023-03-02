import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsUserService } from 'src/app/services/admins-user.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
  options={
    buttons: [
      {
        name:"Inicio",
        route:'account',
        icon: 'home',        
      },
      {
        name:"Mis Fotos",
        route:'misimages',
        icon: 'home',
      },
      {
        name:"Mis Datos",
        route:'misdatos',
        icon: 'home',
      },  
      {
        name:"Mis Peticiones",
        route:'mispeticiones',
        icon: 'home',
      },
      {
        name:"Cerrar Sesion",
        route:'sesion',
        icon: 'home',
      }
    ]
  };
  
  buttons = [];
  fabTogglerState = 'inactive';
  id: string;

  show:boolean=false;


  constructor(private route: ActivatedRoute,private router:Router,private ls:LocalStorageService,private eventos:EventosService,private as:AdminsUserService) {
    this.eventos.getNewupdate().subscribe(x=>{
      this.getUser();
    })
    this.eventos.getCerrarSesion().subscribe(x=>{
      this.show=false;
    })
   }

  ngOnInit(): void {
    const maxButtons = 6;
    if (this.options.buttons.length > maxButtons) {
      this.options.buttons.splice(5, this.options.buttons.length - maxButtons);
    }
    this.getUser();
  }

  async getUser(){
   let resp:any =await  this.ls.cargarStorage('usuario').then(x=>x).catch(e=>false);
   console.log(resp);
   if(resp){
      this.id=resp._id;
      this.show=true;
   }else{
      this.show=false;
   }
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.options.buttons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  nav(route){
    if(route==='sesion'){
      this.as.logout();
      setTimeout(() => {
        this.show=false;
        this.router.navigateByUrl('login');
      }, 100);
    }else{
      this.onToggleFab();
      this.router.navigate([`${route}/${this.id}`]);
    }
  }


}
