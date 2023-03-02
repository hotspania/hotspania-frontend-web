import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.scss']
})
export class PeticionComponent implements OnInit {
  @Input() data:any=[];
  status:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
  change(){
    if(this.status){
      this.status=false;
    }else{
      this.status=true;
    }  
  }

}
