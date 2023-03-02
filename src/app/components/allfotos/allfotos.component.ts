import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { Global } from 'src/app/services/global';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-allfotos',
  templateUrl: './allfotos.component.html',
  styleUrls: ['./allfotos.component.scss']
})
export class AllfotosComponent implements OnInit {
  @Input() id: string='';
  modal_loading: boolean = false;
  show_confirmation:boolean=false;
  show: boolean=false;
  data: any = [];
  imageUrl:string;
  item:any=[];
  city: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private tool: ToolsService,
    private eventos:EventosService
  ) { 
    eventos.closingDialog().subscribe((x:any)=>this.show=false);
  }

  ngOnInit(): void {
    this.getAllImages(this.id,'ACCEPTED','profile')
  }

  getAllImages(id,status,tipo) {
    this.modal_loading = true;
    this.api.getImagesUser(id,status,tipo).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;        
        this.modal_loading = false;
      }
    });
  }

  confirmation(item){
    this.show_confirmation=true;
    this.item=item;
  }

  cancel(){
    this.show_confirmation=false;
    this.item=[];
  }

  
  quitarImagen(){
    this.modal_loading=true;
    let a ={
      _id:this.item._id,
      key:this.item.tipo,
      url:this.item.url,
      user:this.id
    }
    this.api.deleteImagen(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.modal_loading=false;
        this.tool.ShowSuccess();
        this.getAllImages(this.id,'ACCEPTED','profile');
        this.item=[];
        this.show_confirmation=false;
      }
    });  
  }

  open(item){ 
    this.modal_loading=true;
    this.imageUrl=`${Global.urlimages}img/${item.tipo}/${item.url}`;
    setTimeout(() => {  
      this.modal_loading=false;    
      this.show=true;    
    }, 300);
  }



}
