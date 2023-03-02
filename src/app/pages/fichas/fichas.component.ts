import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ficha } from 'src/app/interfaces/ficha';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.scss'],
})
export class FichasComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  screenWidth: any;
  screenHeight: any;
  cardWidth: any;
  cardHeight: any;

  query: string = '';

  data: Array<ficha>;
  originaldata: Array<ficha>;
  loading: boolean;
  state: string;

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit() {
    this.loading = true;
    this.getDetailsScreen(this.screenWidth);

    this.route.queryParams.subscribe((data) => {
      this.state = data.disponibles;
      this.query = this.route.snapshot.paramMap.get('categoria');
      this.getFichas(this.query, this.state);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getDetailsScreen(width) {
    if (width > 1200) {
      this.cardWidth = width / 11;
      this.cardHeight = this.cardWidth * 1.5;
    } else if (width > 1000) {
      this.cardWidth = width / 8.5;
      this.cardHeight = this.cardWidth * 1.5;
    } else if (width > 750) {
      this.cardWidth = width / 6;
      this.cardHeight = this.cardWidth * 1.5;
    } else if (width > 450) {
      this.cardWidth = width / 4;
      this.cardHeight = this.cardWidth * 1.5;
    } else if (width > 321) {
      this.cardWidth = width / 3.25;
      this.cardHeight = this.cardWidth * 1.5;
    } else {
      this.cardWidth = width / 2;
      this.cardHeight = this.cardWidth * 1.5;
    }
  }

  getFichas(query, state?) {
    this.api
      .getFichas(query, state)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.originaldata = resp.data;
          this.data = this.originaldata;
          this.loading = false;
        }
      });
  }

  appyfilter(value: string) {
    this.loading = true;
    this.data = this.originaldata.filter((x) =>
      x.username.includes(value.trim().toLowerCase())
    );
    this.loading = false;
  }
}
