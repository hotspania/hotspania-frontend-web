import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {
  @Input() image:string="";
  @Input() tipe:string="";
  @Input() show:boolean=false;
  url:string="";

  constructor(private eventos:EventosService) { }

  ngOnInit(): void {
  }

  close(){
    this.eventos.Closing();
  }

}
