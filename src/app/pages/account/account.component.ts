import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { timer } from 'rxjs';
import * as dayjs from 'dayjs';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  id: any = '';
  visible: boolean = false;
  loading: boolean = false;
  time: string = '';
  time_online: string;
  countdown = timer(0, 1000);
  minutes: any;
  hours: any;
  seconds: any;
  noticias: any = [];
  data: any = [];
  profile: any = [];
  finanzas:any=[];
  

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private tool: ToolsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOnline(this.id);
    this.countdown.subscribe((t) => {
      this.setCount();
    });

    this.getNoticias();
    this.getProfile(this.id);
    this.getfinanzasProfile(this.id);
  }

  makeOnline(time) {
    this.loading = true;

    let a = {
      id: this.id,
      online: true,
      time: time,
    };

    this.api.makeonline(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.loading = false;
        this.getOnline(this.id);
        this.getProfile(this.id);
        this.visible = true;
      }
    });
  }

  getOnline(id) {
    this.api.getTimeOnline(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.time_online = resp.data.time;
        this.visible = true;
      }
    });
  }

  setCount() {
    if (!!this.time_online) {
      let date = dayjs();
      let olddate = dayjs(this.time_online);
      this.minutes = Math.floor(olddate.diff(date, 'minutes') % 60);
      this.hours = Math.floor(olddate.diff(date, 'hour') % 60);
      this.seconds = Math.floor(olddate.diff(date, 'second') % 60);

      if (this.minutes === 0 && this.hours === 0 && this.seconds === 0) {
        this.visible = false;
        this.time_online = null;
      }
    }
  }

  getNoticias() {
    this.api.getNoticias().subscribe((resp: any) => {
      if (resp.ok) {
        this.noticias = resp.data;
      }
    });
  }

  setStates(item) {
    this.loading = true;
    let a = {
      id: this.profile._id,
      active: this.profile.active,
      freeze: this.profile.freeze,
      visible: this.profile.visible,
      online: this.profile.online,
    };

    switch (item.x) {
      case 'freeze':
        a.freeze = item.value;
        break;
      case 'online':
        a.online = item.value;
        break;
      case 'visible':
        a.visible = item.value;
        break;
      default:
        break;
    }
    this.api.setstates(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.getProfile(this.id);
        this.loading = false;
        this.tool.ShowSuccess();
        if (a.online === false) {
          this.delete(this.id);
        } else if (a.visible === false) {
          this.delete(this.id);
        }
      }
    });
  }
  getProfile(user) {
    this.api.getProfile(user).subscribe((resp) => {
      if (resp.ok) {
        this.profile = resp.data;
      }
    });
  }
  getfinanzasProfile(user) {
    this.api.getProfile(user).subscribe((resp) => {
      if (resp.ok) {
        this.finanzas = resp.data;
      }
    });
  }

  delete(id) {
    this.api.deleteonlinetime(id).subscribe((resp: any) => {
      if (resp.ok) {    
        this.getOnline(this.id);
        this.visible=false;
      }
    });
  }
}
