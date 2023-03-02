import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.scss'],
})
export class CaptureImageComponent implements OnInit {
  archivo: File;
  ImagenTemp: string;
  @Input() id: any = '';
  @Input() show: boolean = false;
  token: any;
  screenWidth: number;
  screenHeight: number;

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private local: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private eventos: EventosService
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
  time: number = 60;
  loading: boolean = false;

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
    this.id = this.route.snapshot.paramMap.get('id');
    // setTimeout(() => {
    //   this.triggerSnapshot();
    // }, 3000);
    this.getCameraPermison();
  }
  public triggerSnapshot(): void {
    this.showWebcam = !this.showWebcam;
    this.trigger.next();
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.webcamImage = null;
    this.showNextWebcam(this.deviceId);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.loading = true;
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
    this.screenWidth = window.innerWidth * 0.9;
    this.screenHeight = window.innerHeight * 0.5;
  }

  async send() {
    let a = {
      id: this.id,
      device: this.deviceId,
      image: this.webcamImage.imageAsBase64,
    };
    this.api.checkFace(a).subscribe(
      (resp: any) => {
        if (resp.ok) {
          this.token = resp.token;
          this.local.SaveStorage('token', this.token);
          this.loading = false;
          this.router.navigate([`/account/${this.id}`]);
          this.eventos.Closing();
        } else {
          console.log(resp);
          this.loading = false;
          this.tools.ShowError('No se Reconocio su rostro');
          this.eventos.Closing();
          this.goback();
        }
      },
      (error: any) => {
        this.loading = false;
        this.tools.ShowError('No se Reconocio su rostro');
        this.goback();
      }
    );
  }

  goback() {
    this.router.navigate(['/login']);
  }

  getCameraPermison() {
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true, video: true })
    //   .then(x=>{
    //     console.log("hola")
    //   }).catch(e=>{      
          
    //       this.tools.ShowError("Debes Permitir la camara para continuar")
    //       console.log("NO ACEPTE")
      
    //   })
  }
}
