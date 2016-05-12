import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { CustomerService } from './customer.service';
import { Customer } from '../shared/customer';

const templateUrl = require('../templates/customers/customer-details.html');

@Component({
  templateUrl: templateUrl,
  providers: [ CustomerService ]
})

export class CustomerUpdateFormComponent implements OnInit {
  id: string = '';
  customer: Customer = null;

  constructor(private routeParams: RouteParams, private customerService: CustomerService) {}

  ngOnInit(): any {
    this.id = this.routeParams.get('id');
    this.customerService
      .getCustomerById(this.id)
      .subscribe(
        r => { this.customer = r; },
        error => console.log(error)
      );
  }

}
