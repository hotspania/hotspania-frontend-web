import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-fotoslistado',
  templateUrl: './fotoslistado.component.html',
  styleUrls: ['./fotoslistado.component.scss'],
})
export class FotoslistadoComponent implements OnInit {
  @Input() id: string = '';
  imagenes: any = [];
  available_images: any = [];
  profileImages: any = [];
  paquetes: any = [];
  restantes = 0;
  paquete: any = [];
  modal_loading: boolean = false;
  data: any = [];
  status: boolean = false;
  fecha_inicio: string = '';
  set_inicio: string = '';
  

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.getImagenes(this.id,'ACCEPTED','profile');
    this.getProfile(this.id);
  }

  getImagenes(id,status,tipo) {
    this.api.getImagesUser(id,status,tipo).subscribe(async (resp: any) => {
      if (resp.ok) {
        this.imagenes = await resp.data;
      }
    });
  }

  addImagen(event) {
    this.profileImages = [...this.profileImages, event.url];
    this.available_images = this.available_images.filter(
      (e) => e._id != event._id
    );
  }

  quitarImagen(item) {
    let existe = this.profileImages.findIndex((e) => e == item);
    this.profileImages.splice(existe, 1);
    this.manageImages();
  }

  getProfile(id) {
    this.api.getProfile(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;
        this.data ? (this.status = true) : (this.status = false);
        this.profileImages = this.data.imagenes.map((x: any) => x);  
        this.manageImages();  
      }
    });
  }

  update() {
    this.modal_loading = true;
    let a = {
      id: this.id,
      imagenes: this.profileImages,
      paquete: this.paquete,
      fecha_inicio: this.fecha_inicio,
    };

    this.api.updateProfilePhotos(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.modal_loading = false;
        this.tools.ShowSuccess();
        this.getProfile(this.id);
      }
    });
  }

  manageImages() {
    this.available_images = [];
    if (!!this.profileImages) {
      this.imagenes.forEach((item) => {            
        let existe = this.profileImages.findIndex(e => e === item.url);       
        if (existe == -1) {
          this.available_images = [...this.available_images, item];
        }
      });   
    } else {
      this.available_images = this.imagenes;
    }
  }
}
