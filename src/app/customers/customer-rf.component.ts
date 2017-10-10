import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  // FormControl,
  FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray
} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import { Customer } from './customer';

// custom validator function
/* function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null;
} */

//customr validator function with parameters
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  }
}

// cross-field validation: custom validator
function emailMatcher(c: AbstractControl) {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmControl.pristine) return null;
  if (emailControl.value === confirmControl.value) return null;
  return { 'match': true };
}

@Component({
  selector: 'pm-signup-rf',
  templateUrl: './customer-rf.component.html'
})
export class CustomerRfComponent implements OnInit {
  customerForm: FormGroup;
  //Data model below
  // customer: Customer = new Customer();

  emailMessage: string;

  //getter for addresses
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  // the list of all available validation messages
  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //3 var. of syntax can be used with FormBuilder
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: ['', ratingRange(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    });

    //This structure is the form model, and tracks the form value and state.
    /*     this.customerForm = new FormGroup({
          firstName: new FormControl(),
          lastName: new FormControl(),
          email: new FormControl(),
          sendCatalog: new FormControl(true)
        }); */

    this.customerForm.get('notification').valueChanges
      .subscribe(value => this.setNotification(value));

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(emailControl));
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', [Validators.required]],
      street2: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  populateTestAllData(): void {
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'gm@gm.com',
      sendCatalog: false,
    });
  }

  populateTestSomeData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
    }
  }


  //adjusting validation rules at runtime
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone'); // reference to the phone FormControl
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
