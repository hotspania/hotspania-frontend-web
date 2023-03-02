import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.scss']
})
export class NavbarAccountComponent implements OnInit {
  id:string="";
  data=[
    {
      name:"Inicio",
      route:'account'
    },
    {
      name:"Mis Fotos",
      route:'misimages'
    },
    // {
    //   name:"Mensajes",
    //   route:'mismensajes'
    // },
    {
      name:"Mis Datos",
      route:'misdatos'
    },
    // {
    //   name:"Mis Publicaciones",
    //   route:'misfinanzas'
    // },
    {
      name:"Mis Peticiones",
      route:'mispeticiones'
    },
  ]

  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  nav(route){
    this.router.navigate([`${route}/${this.id}`]);
  }


}
