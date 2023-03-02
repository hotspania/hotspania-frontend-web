import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public whatsapp: string;
  
  constructor() { }

  ngOnInit(): void {
    this.whatsapp = `https://api.whatsapp.com/send?phone=+5493412632261&text=Hola,%20quiero%20informacion%20para%20registrarme%20en%20www.planetarelax.com`;
  }

}
