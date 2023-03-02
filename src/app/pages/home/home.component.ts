import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  id: string;
  token: string;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private tool: ToolsService,
    private eventos: EventosService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');
    this.setData(this.id,this.token);
  }

  nav(link) {
    this.router.navigate([`anunciantes/${link}`]);
  }

  setData(id, token) {
    this.loading = true;
    try {
      localStorage.setItem('token', token);
      let a = {
        id: id,
      };
      this.api.applogin(a).subscribe(
        (resp: any) => {
          if (resp) {
            this.eventos.newUpdateAlert();
            this.loading = false;
            this.router.navigate([`/account/${this.id}`], { replaceUrl: true });
          }
        },
        (error: any) => {
          this.tool.ShowError('ERROR TOKEN NO VALIDO');
          this.loading = false;
          this.router.navigate([`/anunciantes/all`], { replaceUrl: true });
        }
      );
    } catch (error) {
      this.tool.ShowError('ERROR TOKEN NO VALIDO');
      this.loading = false;
      this.router.navigate([`/anunciantes/all`], { replaceUrl: true });
    }
  }
}
