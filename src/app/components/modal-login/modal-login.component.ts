import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {
  @Input()show: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
