import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminsUserService } from 'src/app/services/admins-user.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  screenHeight: number;
  loading:boolean=false;
  show:boolean=false;
  id:string = '';
  public whatsapp:string;

  constructor(
    private router: Router,
    private us: AdminsUserService,
    private local: LocalStorageService,
    private eventos:EventosService,
    private as:AdminsUserService,
    private tool:ToolsService
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
    });
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.getInit();
    this.whatsapp = `https://api.whatsapp.com/send?phone=+5493412632261&text=Hola,%20quiero%20informacion%20para%20registrarme%20en%20www.planetarelax.com`;
  }

  getInit(){
    (this.as.Logeado())?( this.router.navigate(['/anunciantes/all'])):null
  }


  login() {    
    this.loading=true;
    this.us.LoginTwo(this.form.value).subscribe(
      async (resp: any) => {
        if (resp) {
          this.us.cargarStorage();
          let user:any =await this.local.cargarStorage('usuario');
          this.id=user._id;
          this.loading=false;
          this.eventos.newUpdateAlert();
         this.router.navigate([`account/${this.id}`])
        }
      },
      async (error: any) => {
        this.loading=false;
        this.form.reset();
        this.tool.ShowError("EMAIL O PASSWORD ERRONEOS POR FAVOR INGRESA DE NUEVO")
      }
    );
  }
}
