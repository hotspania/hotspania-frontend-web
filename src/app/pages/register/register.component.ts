import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  'scripts': ['./register.js'];
  public modal_loading: boolean = false;
  public fakeDataForm: FormGroup;
  public filesDataForm: FormGroup;
  public realDataForm: FormGroup;
  public notificationForm: FormGroup;
  private id: string = "";
  private files: any[] = [];
  public archivo: File;
  public images:any=[];
  public ImagenTemp: string;
  public loading:boolean=false;
  public isFullTime: boolean = false;
  public languages: any = [
    { name: 'español', description:'Español', id: 'español', value: 'español', checked: true },
    { name: 'ingles', description:'Inglés', id: 'ingles', value: 'ingles', checked: false },
    { name: 'frances', description:'Francés', id: 'frances', value: 'frances', checked: false },
    { name: 'aleman', description:'Alemán', id: 'aleman', value: 'aleman', checked: false },
    { name: 'portugues', description:'Portugués', id: 'portugues', value: 'portugues', checked: false },
    { name: 'ruso', description:'Ruso', id: 'ruso', value: 'ruso', checked: false },
    { name: 'arabe', description:'Árabe', id: 'arabe', value: 'arabe', checked: false },
  ];

  constructor(
    private _registerService: RegisterService,
    private router: Router,
    private tool:ToolsService
    ) {
    this.realDataForm = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      nif: new FormControl(null, Validators.required),
      dni: new FormControl(null, Validators.required),
      //telefono: new FormControl(null, Validators.required),
    });

    this.fakeDataForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      edad: new FormControl(null),
      whatsapp: new FormControl(1, Validators.required),
      llamadas: new FormControl(1, Validators.required),
      telefono: new FormControl(null),
      //atencion: new FormControl(this.atencion),
      //tags: new FormControl(null),
      fumadora: new FormControl('Si', Validators.required),
      zonas: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      servicios: new FormControl(null, Validators.required),
      idioma: new FormArray([], Validators.required),
      estatura: new FormControl(null),
      peso: new FormControl(null),
      busto: new FormControl(null),
      cintura: new FormControl(null),
      cadera: new FormControl(null),
      inicio: new FormControl(null, Validators.required),
      fin: new FormControl(null, Validators.required),
      horario_inicio: new FormControl(null, Validators.required),
      horario_fin: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      zone: new FormControl(null, Validators.required),
    });

    this.filesDataForm = new FormGroup({
      files: new FormControl(null, Validators.required),
    });

    this.notificationForm = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
    });

  }

  ngOnInit(): void {
    this.getScript();
  }

  seleccionImagen(file: File) {

    if (!file) {
      this.archivo = null;
      return;
    }   
    if (file.type.indexOf('image') < 0) {
      return;
    }
    if (file.size > 4000000) {
      return;
    }
    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () =>this.ImagenTemp = reader.result.toString();   
    this.archivo=file;
  }

  public onSubmit1() {
    this.loading=true;
    this._registerService.registerRealData(this.realDataForm.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.id=resp.id;
          this._registerService.subirArchivo(this.archivo,'dni',this.id).then((updata:any)=>{
            this.modal_loading=false;
            console.log('foto dni ok');
          }).catch((error)=>{
            console.error('error foto dni');
          })

          this.onSubmit2();
      }
    });
    this.loading=false;
  }

  public onSubmit2() {
    this.loading=true;
    if(this.files.length==1){
      this._registerService.subirArchivo(this.files[0], 'original', this.id).then((resp:any)=>{
        console.log(resp.message);
        if (resp.ok) {
          this.onSubmit3();
          console.log('files ok');
        }
      });
    }else{
      this._registerService.registerFiles(this.files, 'original', this.id).then((resp:any)=>{
        console.log(resp.message);
        if (resp.ok) {
          this.onSubmit3();
          console.log('files ok');
        }
      });
    }
    this.loading=false;
  }

  public onSubmit3() {
    this.loading=true;
    this.fakeDataForm.value.id = this.id;
    this._registerService.registerFakeData(this.fakeDataForm.value).subscribe((resp: any) => {
      if (resp.ok) {
        console.log('fake data ok');
      }
    });

    this.notificationForm.setValue({
      titulo: 'Registro',
      descripcion: `Usuario ${this.fakeDataForm.value.username} (${this.realDataForm.value.email})`,
      tipo: 'Registro',
    });

    this._registerService.saveNotification(this.notificationForm.value).subscribe((resp: any) => {
      if (resp.ok) {
        console.log('notification ok');
      }
    });


    setTimeout(() => {
      this.loading=false;
      this.tool.ShowSuccess("Gracias por registrarse en Hotspania. Muy pronto su usuario será validado.");
      this.router.navigate([`/`]);
     }, 2000);
  }

  public setFulltime(event: any) {
    const checked = event.target.checked;
    const div_horario_inicio = document.querySelector<HTMLElement>('#div_horario_inicio');
    const div_horario_fin = document.querySelector<HTMLElement>('#div_horario_fin');
    const horario_inicio = document.querySelector<HTMLElement>('#start_time');
    const horario_fin = document.querySelector<HTMLElement>('#end_time');
    if(checked) {
      this.isFullTime = true;
      div_horario_inicio.style.display = "none";
      horario_inicio.classList.remove("step1input");
      div_horario_fin.style.display = "none";
      horario_fin.classList.remove("step1input");
      this.fakeDataForm.patchValue({ horario_fin: "fulltime", horario_inicio: "fulltime" });
    } else {
      this.isFullTime = false;
      div_horario_inicio.style.display = "block";
      horario_inicio.classList.add("step1input");
      div_horario_fin.style.display = "block";
      horario_fin.classList.add("step1input");
      this.fakeDataForm.patchValue({ horario_fin: null, horario_inicio: null });
    }
  }

  public async onChange(event: any): Promise<void> {
    const target = event.target;

    const value = target.value;
    const name = target.name;
    const id = target.id;

    switch (name) {
      case 'name':
        await this.existUsername(value) ? this.textError("exist_username", true) : this.textError("exist_username", false);
        isNaN(value) && !this.checkUndefinedOrNull(value) && await this.existUsername(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'age':
        !isNaN(value) && value >= 18 && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'height':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'weight':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'weight':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'measures1':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'measures2':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'measures3':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'start_day':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'end_day':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;
        
      case 'gender':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'services':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'city':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'zone':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'smoke':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'phone':
        !isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'real_name':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'email':
        await this.existEmail(value) ? this.textError("exist_email", true) : this.textError("exist_email", false);
        value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          && !this.checkUndefinedOrNull(value) && await this.existEmail(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'nif':
        const allowedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'bmp'];
        const fileExtension = value.split('.').pop().toLowerCase();
        allowedExtensions.includes(fileExtension) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'nif_pass':
        !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;

      case 'files':
        const allowedExtensions2 = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'bmp', 'mp4', 'avi', 'mpg', 'mov', 'wmv', 'flv', '3gp'];
        let totalErrors = 0;

        if(this.files.length > 20){
          totalErrors++;
        }

        this.files.map((val) => {
          const fileExtension = val.name.split('.').pop().toLowerCase();
          if (!allowedExtensions2.includes(fileExtension)) {
            totalErrors++;
          }

          if (val.size > 4000000) {
            totalErrors++;
          }
    
        });
        totalErrors === 0 && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
        break;
    }

    if(!this.isFullTime){
      switch(name) {
        case 'start_time':
          !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
         break;
 
       case 'end_time':
          !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
         break;
      }
    }

    this.validateSection();
  }

  private validateSection() {
    const totalSection = 3;
    for (let i = 1; i <= totalSection; i++) {
      let errors = 0;
      $(`.step${i}input`).each(function (index) {
        if (!$(this).hasClass('correct')) {
          errors++;
        }
      });

      if (errors === 0) {
        $(`.btnstep${i}`).removeClass('disabled');
        $(`.btnstep${i}`).prop('disabled', false);
      } else {
        $(`.btnstep${i}`).addClass('disabled');
        $(`.btnstep${i}`).prop('disabled', true);
      }
    }
  }

  private textError(id: any, bool: boolean): void {
    const selectorID = $(`#${id}`);
    if (bool) {
      selectorID.addClass('d-none');
    } else {
      selectorID.removeClass('d-none');
    }
  }

  private validate(id: any, bool: boolean): void {
    const selectorID = $(`#${id}`);
    if (bool) {
      selectorID.addClass('correct');
      selectorID.removeClass('error');
    } else {
      selectorID.addClass('error');
      selectorID.removeClass('correct');
    }
  }

  public onFileChange(f: any) {
    this.files = [];
    const files = Array.from(f);
    files.map((targ:any) => {
      this.files.push(targ);

      let reader = new FileReader();
      let UrlImageTemp = reader.readAsDataURL(targ);
      reader.onloadend = () => this.images.push({
        nombre: targ.name,
        imagen: reader.result.toString()
      });

    });

  }

  private checkUndefinedOrNull(value: any): boolean {
    if (value === null || value === undefined || value === "") {
      return true;
    } else {
      return false;
    }
  }

  public onCheckChange(event) {
    const formArray: FormArray = this.fakeDataForm.get('idioma') as FormArray;
    formArray.push(new FormControl("español"));
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  private getScript() {
    /**
     * Define a function to navigate betweens form steps.
     * It accepts one parameter. That is - step number.
     */
    const navigateToFormStep = (stepNumber) => {
      /**
       * Hide all form steps.
       */
      document.querySelectorAll('.form-step').forEach((formStepElement) => {
        formStepElement.classList.add('d-none');
      });
      /**
       * Mark all form steps as unfinished.
       */
      document
        .querySelectorAll('.form-stepper-list')
        .forEach((formStepHeader) => {
          formStepHeader.classList.add('form-stepper-unfinished');
          formStepHeader.classList.remove(
            'form-stepper-active',
            'form-stepper-completed'
          );
        });
      /**
       * Show the current form step (as passed to the function).
       */
      document.querySelector('#step-' + stepNumber).classList.remove('d-none');
      /**
       * Select the form step circle (progress bar).
       */
      const formStepCircle = document.querySelector(
        'li[step="' + stepNumber + '"]'
      );
      /**
       * Mark the current form step as active.
       */
      formStepCircle.classList.remove(
        'form-stepper-unfinished',
        'form-stepper-completed'
      );
      formStepCircle.classList.add('form-stepper-active');
      /**
       * Loop through each form step circles.
       * This loop will continue up to the current step number.
       * Example: If the current step is 3,
       * then the loop will perform operations for step 1 and 2.
       */
      for (let index = 0; index < stepNumber; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector(
          'li[step="' + index + '"]'
        );
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
          /**
           * Mark the form step as completed.
           */
          formStepCircle.classList.remove(
            'form-stepper-unfinished',
            'form-stepper-active'
          );
          formStepCircle.classList.add('form-stepper-completed');
        }
      }
    };
    /**
     * Select all form navigation buttons, and loop through them.
     */
    document
      .querySelectorAll('.btn-navigate-form-step')
      .forEach((formNavigationBtn) => {
        /**
         * Add a click event listener to the button.
         */
        formNavigationBtn.addEventListener('click', () => {
          /**
           * Get the value of the step.
           */
          const stepNumber = parseInt(
            formNavigationBtn.getAttribute('step_number')
          );
          /**
           * Call the function to navigate to the target form step.
           */
          navigateToFormStep(stepNumber);
        });
      });
  }

  private async existEmail(email: string): Promise<boolean>{
    let bool = false;
    await this._registerService.existEmail(email).toPromise().then((resp:any)=>{
      bool = resp.email;
    });
    return bool;
  }

  private async existUsername(username: string): Promise<boolean>{
    let bool = false;
    await this._registerService.existUsername(username).toPromise().then((resp:any)=>{
      bool = resp.username;
    });
    return bool;
  }
}
