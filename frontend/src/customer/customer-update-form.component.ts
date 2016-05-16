import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';
import { CustomerDetailsService } from './customer-details.service';
import { CustomerDetails } from '../shared/customer-details';
import { FormBuilder } from 'angular2/common';
import { ControlGroup } from 'angular2/common';
import { Validators } from 'angular2/common';
import { GlobalValidator } from '../shared/global-validator';

const templateUrl = require('../templates/customers/customer-details.html');

@Component({
  templateUrl: templateUrl,
  providers: [ CustomerDetailsService ]
})

export class CustomerUpdateFormComponent implements OnInit {
  id: string = '';
  customerDetails: CustomerDetails = null;
  updateCustomerForm: ControlGroup;
  alertMsg: {msg: string, type: string} = null;

  constructor(private routeParams: RouteParams,
              private router: Router,
              private customerDetailsService: CustomerDetailsService,
              private formBuilder: FormBuilder) {
    this.createFormElements();
  }

  ngOnInit(): any {
    this.id = this.routeParams.get('id');
    this.customerDetailsService
      .getCustomerDetailsById(this.id)
      .subscribe(
        data => {
          this.customerDetails = data[1];
          this.customerDetails.states = data[0];
        },
        error => console.log(error)
      );
  }

  createFormElements() {
    this.updateCustomerForm = this.formBuilder.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'username': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required,
        GlobalValidator.emailValidator
      ])],
      'address': ['', Validators.required],
      'city': ['', Validators.required],
      'zipcode': ['', Validators.compose([
        Validators.required,
        GlobalValidator.zipcodeValidator
      ])]
    });
  }

  onSave(form: any) {
    this.alertMsg = { msg: '', type: ''};
    this.customerDetailsService
        .update(this.id, this.customerDetails)
        .subscribe(
          response => {
            this.alertMsg.msg = 'Customer successfully saved.';
            this.alertMsg.type = 'alert alert-success';
            //this.router.navigateByUrl('/customer');},
          },
          error => {
            this.alertMsg.msg = "Customer couldn't be saved";
            this.alertMsg.type = 'alert alert-danger';
          }
        );
  }
}
