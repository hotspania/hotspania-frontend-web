import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  @Input() img:string="";
  @Input() tipe:string="";
  @Input() height:number=200;
  @Input() width:number=120;
  url:string;
  agua: string;
  
  constructor() { }

  ngOnInit(): void {
    this.url=`${Global.urlimages}img/${this.tipe}/${this.img}`;    
    this.agua= `/assets/img/marca_agua.png`;  
  }

}
