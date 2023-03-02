import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-misfinanzas',
  templateUrl: './misfinanzas.component.html',
  styleUrls: ['./misfinanzas.component.scss']
})
export class MisfinanzasComponent implements OnInit {
  input_number: number = 1;
  output_number: number = 1;
  pages_input: any = [];
  pages_output: any = [];
  admin: any = [];
  inputs: any = [];
  outputs: any = [];
  $profile: boolean = false;
  profile: any;
  id: string;

  constructor(
    private api: ApiService,  
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    private eventos: EventosService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPublicaciones(this.id);
    this.getCompras(this.id);
    this.getIngresos(this.id)
  }

  addpage(number) {
    this.input_number = number;
    this.inputs = this.inputs.slice(
      (this.input_number - 1) * 10,
      this.input_number * 10
    );
  }

  addpage2(number) {
    this.output_number = number;
    this.outputs = this.outputs.slice(
      (this.output_number - 1) * 10,
      this.output_number * 10
    );
  }

  getPublicaciones(id) {
    this.api.getProfile(id).subscribe(
      (resp: any) => {
        if (resp.ok) {
          this.profile = resp.data;
        }
      },
      (error: any) => {
        this.$profile = false;
      }
    );
  }

  getCompras(id) {
    this.api.getComprasUser(id).subscribe(
      (resp: any) => {
        if (resp.ok) {
          let x: Array<any> = resp.data;
          this.outputs = x.slice(0, this.output_number * 10);         
          this.pages_output = Array(Math.round(this.outputs.length / 10) + 1)
            .fill(null)
            .map((_, i) => i + 1);

          this.$profile = true;
        }
      },
      (error: any) => {
        this.$profile = false;
      }
    );
  }

  getIngresos(id) {
    this.api.getIngresosUser(id).subscribe(
      (resp: any) => {
        if (resp.ok) {
          let x: Array<any> = resp.data;

          this.inputs = x.slice(0, this.input_number * 10);
          this.pages_input = Array(Math.round(this.inputs.length / 10) + 1)
            .fill(null)
            .map((_, i) => i + 1);
          this.$profile = true;
        }
      },
      (error: any) => {
        this.$profile = false;
      }
    );
  }



}
