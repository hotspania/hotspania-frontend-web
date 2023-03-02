import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myimages',
  templateUrl: './myimages.component.html',
  styleUrls: ['./myimages.component.scss'],
})
export class MyimagesComponent implements OnInit {

  data = [
    {
      id: 0,
      titulo: 'Atras',
    },
    {
      id: 1,
      titulo: 'Todas las Fotos',
    },
    {
      id: 2,
      titulo: 'Subir Fotos',
    },
    {
      id: 3,
      titulo: 'Fotos de la Publicacion',
    },
    {
      id: 4,
      titulo: 'Foto de perfil',
    },
  ];
  screen: string = '1';
  id: string;

  constructor(private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  show(id) {
    if(id===0){
      this.router.navigate([`/account/${this.id}`])
    }
    this.screen = id;
  }
}
