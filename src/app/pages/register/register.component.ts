import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  'scripts': ['./register.js'];
  protected form: FormGroup;
  private files: any[] = [];

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      measures1: new FormControl(null, Validators.required),
      measures2: new FormControl(null, Validators.required),
      measures3: new FormControl(null, Validators.required),
      //horario: new FormControl(null, Validators.required),
      zone: new FormControl(null, Validators.required),
      smoke: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      nif: new FormControl(null, Validators.required),
      files: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getScript();
  }

  protected onChange(event: any): void {
    const target = event.target;

    const value = target.value;
    const name = target.name;
    const id = target.id;

    switch(name){
      case 'name':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'age':
        !isNaN(value) && value>=18 && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'weight':
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

      case 'zone':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'smoke':
        isNaN(value) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'phone':
        !isNaN(value) && value.length === 9 && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'email':
        value.math(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
         && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'nif':
        const allowedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'bmp'];
        const fileExtension = value.split('.').pop().toLowerCase();
        allowedExtensions.includes(fileExtension) && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;

      case 'files':
        const allowedExtensions2 = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'bmp', 'mp4', 'avi', 'mpg', 'mov', 'wmv', 'flv', '3gp'];
        let totalErrors = 0;
        this.files.map((val) => {
          const fileExtension = val.name.split('.').pop().toLowerCase();
          if(!allowedExtensions2.includes(fileExtension)){
            totalErrors++;
          }
        });
        totalErrors === 0 && !this.checkUndefinedOrNull(value) ? this.validate(id, true) : this.validate(id, false);
      break;
    }
  }

  protected validateSection(){
    /*const totalSection = 3;
    for(let i = 1; i <= totalSection; i++){
      let totalInputs = 0;
      let errors = 0;
      let success = 0;
      $(`#step-${i} input`).each(function( index ) {
        totalInputs++;
          if($(this).val() && $(this).attr('type') !== 'radio'){
            if(!$(this).hasClass('correct')){
              errors++;
            }
          }
      });

      console.log($(`.step-${i}`));

      $(`#step-${i} select`).each(function( index ) {
        totalInputs++;
        if($(this).val()){
          if(!$(this).hasClass('correct')){
            errors++;
          }
        }
      });
      
      console.log('e', errors);

      console.log('ewgewg', $(`.step-${i}`));
      if(errors > 0 || success < totalInputs){
        $(`.step-${i}-circle`).css('background', 'red');
        $(`.step-${i}`).removeClass('form-stepper-completed');
        $(`.step-${i}`).removeClass('form-stepper-active');
        $(`.step-${i}`).addClass('form-stepper-unfinished');
      }

      if(success === 0){
        $(`.step-${i}`).removeClass('form-stepper-active');
        $(`.step-${i}`).removeClass('form-stepper-unfinished');
        $(`.step-${i}`).addClass('form-stepper-completed');
      }
    } */
  }

  private validate(id: any, bool: boolean):void {
    const selectorID = $(`#${id}`);
    if(bool){
      selectorID.addClass('correct');
      selectorID.removeClass('error');
    } else {
      selectorID.addClass('error');
      selectorID.removeClass('correct');
    }
  }

  protected onFileChange(event:any) {
    this.files = [];
    const target = event.target;
    const files =  Array.from(target.files);
    files.map((targ) => {
      this.files.push(targ);
    });

}

  private checkUndefinedOrNull(value: any): boolean {
    if(value === null || value === undefined || value === ""){
      return true;
    } else {
      return false;
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
}
