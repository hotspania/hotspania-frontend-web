import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
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
