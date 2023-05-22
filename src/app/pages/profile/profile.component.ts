import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { Global } from 'src/app/services/global';
import { GoogleanalyticsService } from 'src/app/services/googleanalytics.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  $user: string;
  item: any = [];
  colletion: any = [];
  profileimage: string = '';
  random: number;
  gif: string;
  screenWidth: number;
  screenHeight: number;
  agua: string;
  whatsapp: string;
  telefono: string;
  loading: boolean = true;

  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private eventos: EventosService,
    public googleAnalyticsService:GoogleanalyticsService 
  ) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.eventos.getNewupdate().subscribe((x) => {
      this.show = true;
    });

    this.eventos.closingDialog().subscribe((x) => {
      this.show = false;
    });
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.$user = this.route.snapshot.paramMap.get('user');
      this.sendEvent(this.$user);
      this.getProfile(this.$user);
    });

    this.getrandom();
  }

  sendEvent(route) {
    this.googleAnalyticsService.eventEmitter(route, "profile", "view", "click", 1);
  }

  getProfile(user) {
    this.api.getFicha(user).subscribe((resp) => {
      if (resp.ok) {
        this.item = resp.data.fakeData;
        this.telefono = `tel:+54${this.item.telefono}`;
        this.whatsapp = `https://api.whatsapp.com/send?phone=+54${this.item.whatsapp}&text=Hola,%20vi%20tu%20ficha%20en%20www.planetarelax.com,%20quería%20hacerte%20una%20consulta`;
        this.colletion = resp.colletion;
        this.loading = false;
        this.profileimage = `${Global.urlimages}/img/original/${this.colletion.imagen}`;
      }
    });
  }

  getrandom() {
    this.random = Math.round(Math.random() * (6 - 1 + 1) + 1);
    this.gif = `/assets/img/${this.random}.gif`;
    this.agua = `/assets/img/marca_agua.png`;
  }
}
