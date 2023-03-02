import { Component, HostListener, Input, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss'],
})
export class ImagenComponent implements OnInit {
  @Input() image: string = '';
  @Input() slides: any = [];
  @Input() show: boolean = false;
  @Input() telefono: string = '';
  @Input() whatsapp: string = '';

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    touchMove: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          centerMode: false,
          touchMove: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: true,
          centerMode: false,
          touchMove: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          infinite: true,
          centerMode: false,
          touchMove: true,
          autoplay: true,
        },
      },
    ],
  };
  agua: string;

  screenWidth: number;
  screenHeight: number;

  @HostListener('window:resize', ['$event.target'])
  onResize(event) {
    if (window.innerWidth > 1000) {
      this.screenWidth = window.innerWidth * 0.3;
      this.screenHeight = window.innerHeight * 0.8;
    } else if (window.innerWidth > 600) {
      this.screenWidth = window.innerWidth * 0.45;
      this.screenHeight = window.innerHeight * 0.8;
    } else if (window.innerWidth > 500) {
      this.screenWidth = window.innerWidth * 0.98;
      this.screenHeight = window.innerHeight * 0.9;
    } else if (window.innerWidth > 300) {
      this.screenWidth = window.innerWidth * 0.98;
      this.screenHeight = window.innerHeight;
    } else {
      this.screenWidth = window.innerWidth * 0.98;
      this.screenHeight = window.innerHeight;
    }
  }

  constructor(public eventos: EventosService) {
    if (window.innerWidth > 1000) {
      this.screenWidth = window.innerWidth * 0.3;
      this.screenHeight = window.innerHeight * 0.8;
    } else if (window.innerWidth > 600) {
      this.screenWidth = window.innerWidth * 0.45;
      this.screenHeight = window.innerHeight * 0.8;
    } else if (window.innerWidth > 500) {
      this.screenWidth = window.innerWidth * 0.98;
      this.screenHeight = window.innerHeight * 0.9;
    } else if (window.innerWidth > 300) {
      this.screenWidth = window.innerWidth * 0.98;
      this.screenHeight = window.innerHeight * 0.8;
    } else {
      this.screenWidth = window.innerWidth * 0.98;
      this.screenHeight = window.innerHeight * 0.8;
    }
  }

  ngOnInit(): void {
    this.agua = `/assets/img/marca_agua.png`;
  }
}
