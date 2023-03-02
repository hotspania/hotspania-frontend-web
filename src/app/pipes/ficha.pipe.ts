import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../services/global';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';


@Pipe({
  name: 'ficha',
})
export class FichaPipe implements PipeTransform {
   url:String;

  
  constructor(private http: HttpClient) {
    this.url = Global.url;
  }
  
   async transform(id: string, tipo: string): Promise<any> {
    
    let complement="";  
    let headers = new HttpHeaders().set("Content-Type", "application/json");  

    if(!!id){
      switch (tipo) {
        case 'username':
         
          complement = 'getprofile/'+id;
          
          break;
  
        case 'admin':
          
          complement = 'getadmin/'+id;
      
        default:
          break;
      }
  
      let response =await this.http.get(this.url+complement, { headers: headers }).toPromise().then((x:any)=>{
        if(tipo==='username'){
         return x.data[0].fakeData.username
        }
        if(tipo==='admin'){      
          return x.data.nombre;
        }
  
      }); 
  
      return response
    }else{

      return "DEFAULT"

    }

    
  }


}
