import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'pm-signup-rf',
  templateUrl: './customer-rf.component.html'
})
export class CustomerRfComponent implements OnInit {
  customerForm: FormGroup;
  //Data model below
  customer: Customer = new Customer();

  ngOnInit(): void {
    //This structure is the form model, and tracks the form value and state.
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });
  }

  populateTestAllData(): void {
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'gm@gm.com',
      sendCatalog: false
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
}
