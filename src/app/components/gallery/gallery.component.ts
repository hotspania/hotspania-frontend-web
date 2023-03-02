import { Component, HostListener, Input, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
 @Input()slides :any = [];
 @Input()telefono :string ="";
 @Input()whatsapp :string ="";

 slideConfig = {
  slidesToShow: 2,
  slidesToScroll: 1,  
  centerMode:false,   
  touchMove:true,  
  autoplay:true, 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
        centerMode:false,         
        touchMove:true,    
        autoplay:true, 
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        infinite: true,  
        centerMode:false,        
        touchMove:true,        
        autoplay:true,       
      },
    },
    {
      breakpoint: 375,
      settings: {
        slidesToShow: 1,
        infinite: true, 
        centerMode:false,       
        touchMove:true,        
        autoplay:true, 
      },       
    },
  ],
};

  // slideConfig = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,  
  //   centerMode:true,
  //   autoplay:true,
  
  //   adaptiveHeight:false,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         infinite: true,
  //         centerMode:true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,  
  //         centerMode:true,      
  //       },
  //     },
  //     {
  //       breakpoint: 375,
  //       settings: {
  //         slidesToShow: 1,
  //         centerMode:true         
  //       },       
  //     },
  //   ],
  // };
  image: string;
  show:boolean=false;
  agua: string;
  data:any=[];
  modal_image:boolean=false;
  loading:boolean=true;

  screenWidth: number;
  screenHeight: number;

  // @HostListener('window:resize', ['$event.target'])
  // onResize(event) {
  //   if(window.innerWidth>1000){
  //     this.screenWidth = window.innerWidth*0.3;
  //     this.screenHeight = window.innerHeight*0.8;
  //   }else if(window.innerWidth>600){
  //     this.screenWidth = window.innerWidth*0.45;
  //     this.screenHeight = window.innerHeight*0.8;
  //   }else if(window.innerWidth>500){
  //     this.screenWidth = window.innerWidth*0.98;
  //     this.screenHeight = window.innerHeight*0.9;
  //   }else if(window.innerWidth>300){
  //     this.screenWidth = window.innerWidth*0.98;
  //     this.screenHeight = window.innerHeight*0.8;
  //   }else{
  //     this.screenWidth = window.innerWidth*0.98;
  //     this.screenHeight = window.innerHeight;
  //   }
 
  // }


  constructor(private eventos:EventosService) {
    eventos.closingDialog().subscribe((x:any)=>{
      this.show=false;
      this.image="";
    })
    if(window.innerWidth>1000){
      this.screenWidth = window.innerWidth*0.3;
      this.screenHeight = window.innerHeight*0.8;
    }else if(window.innerWidth>600){
      this.screenWidth = window.innerWidth*0.45;
      this.screenHeight = window.innerHeight*0.8;
    }else if(window.innerWidth>500){
      this.screenWidth = window.innerWidth*0.98;
      this.screenHeight = window.innerHeight*0.9;
    }else if(window.innerWidth>300){
      this.screenWidth = window.innerWidth*0.98;
      this.screenHeight = window.innerHeight*0.8;
    }else{
      this.screenWidth = window.innerWidth*0.98;
      this.screenHeight = window.innerHeight*0.7;
    }
  }

  ngOnInit(): void {
    this.agua= `/assets/img/marca_agua.png`;
  }
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  zoom(item){
    this.eventos.newUpdateAlert();
    // this.data=this.slides;
    // this.image=`${Global.urlimages}img/profile/${item}`;
    // this.show=true;  
    // this.modal_image=true;  
    this.loading=false;
  }

}
