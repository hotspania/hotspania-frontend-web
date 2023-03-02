import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-mispeticiones',
  templateUrl: './mispeticiones.component.html',
  styleUrls: ['./mispeticiones.component.scss']
})
export class MispeticionesComponent implements OnInit {
  mensaje:string="";
  modal_loading:boolean=false;
  id:string="";
  data:any=[];

  constructor(private route: ActivatedRoute,private api:ApiService,private tool:ToolsService) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
    this.getpeticiones(this.id);
  }

  sendpeticion(){
    this.modal_loading=true;
  
    if(this.mensaje.length<5){
      this.tool.ShowError("Tu peticion debe tener almenos 5 palabras");
      this.modal_loading=false;
      return 
    }
    
    let a={
      user:this.id,
      mensaje:this.mensaje
    }

    this.api.sendpeticion(a).subscribe(resp=>{
        if(resp.ok){
          this.mensaje="";
          this.tool.ShowSuccess();
          this.getpeticiones(this.id);
          this.modal_loading=false;
        }    
    })

  }

  getpeticiones(id) {
    this.api.getPeticiones(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;      
      }
    });
  }

}
