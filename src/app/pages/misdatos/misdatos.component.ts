import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
})
export class MisdatosComponent implements OnInit {
  modal_loading: boolean = false;
  form: FormGroup;
  zonas: any = [];
  atencion: Array<any> = [];
  id: string = '';
  data: any = [];
  listados: any;
  data2: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private tool: ToolsService
  ) {
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      whatsapp: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      atencion: new FormControl(null, Validators.required),
      tags: new FormControl(null),
      fumadora: new FormControl(null, Validators.required),
      zonas: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      servicios: new FormControl(null, Validators.required),
      estatura: new FormControl(null, Validators.required),
      peso: new FormControl(null, Validators.required),
      busto: new FormControl(null, Validators.required),
      cintura: new FormControl(null, Validators.required),
      cadera: new FormControl(null, Validators.required),
      inicio: new FormControl(null, Validators.required),
      fin: new FormControl(null, Validators.required),
      horario_inicio: new FormControl(null, Validators.required),
      horario_fin: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getZonas();
    this.getFakeData(this.id);
    this.getProfile(this.id);
    this.form.patchValue({ id: this.id });
  }

  pushlocations(e) {
    if (this.atencion.includes(e.target.value)) {
      this.atencion = this.atencion.filter((a) => a !== e.target.value);
    } else {
      this.atencion = [...this.atencion, e.target.value];
    }
    this.form.patchValue({ atencion: this.atencion });
  }

  getZonas() {
    this.api.getZones().subscribe((resp: any) => {
      if (resp.ok) {
        this.zonas = resp.data;
      }
    });
  }

  getFakeData(id) {
    this.api.getFakeFicha(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data[0].fakeData;
        this.form.patchValue(this.data);
      }
    });
  }

  cleanUnnecessaryWhiteSpaces(cadena: string) {
    return cadena.replace(/\s+/g, ' ').trim();
  }

  save() {
    this.modal_loading = true;
    let a = this.cleanUnnecessaryWhiteSpaces(this.form.value.telefono);
   

    this.api.putFakeData(this.form.value).subscribe((resp: any) => {
      if (resp.ok) {
        this.getFakeData(this.id);
        this.modal_loading = false;
        this.tool.ShowSuccess();
      }
    });
  }

  getProfile(id) {
    this.api.getProfile(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.listados = resp.data.listados;
        // this.setCheckBox();
      }
    });
  }
}
