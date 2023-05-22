import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ficha } from 'src/app/interfaces/ficha';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {
  @Input()width :any;
  @Input()heigth :any;
  @Input()item :ficha;
  image:string="";
  random:number;
  gif:string="";
  agua:string="";


  constructor(private router:Router) {

   }

  ngOnInit(): void {
    this.getimage();
    this.getrandom();
  }

  getimage(){
    this.image=`${Global.urlimages}img/profile/${this.item.imagen}`;
  }

  nav(){
    let name = this.item.username.replace(/\s/g, '-') 
    this.router.navigate([`/${name}/perfil`])
  }

  getrandom(){
    this.random=Math.round((Math.random()* (6 - 1 + 1) + 1));
    this.gif=`/assets/img/${this.random}.gif`;
    this.agua= `/assets/img/marca_agua.png`;
  }

}
