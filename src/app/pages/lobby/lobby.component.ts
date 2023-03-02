import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { AdminsUserService } from 'src/app/services/admins-user.service';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  archivo: File;
  ImagenTemp: string;
  id: any;
  token: any;
  screenWidth: number;
  screenHeight: number;
  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private local: LocalStorageService,
    private up: UploadService,
    private router: Router,
    private route: ActivatedRoute,
    private eventos: EventosService,
    private as:AdminsUserService
  ) {
    this.screenWidth = window.innerWidth * 0.8;
    this.screenHeight = window.innerHeight * 0.5;
  }
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 },
  };
  public errors: WebcamInitError[] = [];
  count: any;
  time: number = 3;
  loading: boolean = false;
  error: boolean = false;

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public async ngOnInit(): Promise<void> {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
    this.id = this.route.snapshot.paramMap.get('id');

    this.getInit();

    let permission = await this.askPermission();
    if (permission) {
      this.countstart();
      setTimeout(() => {
        this.triggerSnapshot();
      }, 4000);
    } 
  }

  countstart() {
    this.count = setInterval(() => {
      this.time = this.time - 1;
    }, 1000);
  }

  public triggerSnapshot(): void {
    this.showWebcam = !this.showWebcam;
    this.trigger.next();
  }

  getInit(){
    (this.as.Logeado())?( this.router.navigate(['/anunciantes/all'])):null
  }

  public async askPermission() {
    return await navigator.permissions
      .query({ name: 'camera' })
      .then((result) => {
        if (result.state == 'granted') {
          return true;
        } else if (result.state == 'prompt') {
          return true;
        }else if (result.state == 'denied') {
          return false;
        }
        // Don't do anything if the permission was denied.
      });
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.webcamImage = null;
    this.showNextWebcam(this.deviceId);
  }

  public async handleInitError(error: WebcamInitError): Promise<void> {
    this.error = true;
    this.errors.push(error);
    let x = await this.askPermission();
    if (!x) {
      this.tools.ShowCameraError(
        'ERROR DE PERMISOS DEBES PERMITIR LA CAMARA PARA CONTINUAR'
      );
    }
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.send();
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(event) {
    this.screenWidth = window.innerWidth * 0.8;
    this.screenHeight = window.innerHeight * 0.5;
  }

  async send() {
    this.loading = true;
    let a = {
      id: this.id,
      device: this.deviceId,
      image: this.webcamImage.imageAsBase64,
      error: this.error,
    };
    this.api.checkFace(a).subscribe(
      (resp) => {
        if (resp.ok) {
          this.token = resp.token;
          clearInterval(this.count);
          localStorage.setItem('token', this.token);
          this.eventos.newUpdateAlert();
          this.router.navigate([`/account/${this.id}`],{ replaceUrl: true });
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
        this.tools.ShowError('No se Reconocio su rostro');
        this.goback();
      }
    );

    // this.api.checkFace().subscribe((resp:any)=>{},(error:any)=>{
    //   console.log("error");
    // })
  }

  goback() {
    this.router.navigate(['/login']);
  }
}
