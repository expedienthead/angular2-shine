import { Component } from 'angular2/core';
import { Customer } from '../shared/customer';

const templateUrl = require('../templates/customers/customer-list.tpl.html');

@Component({
  selector: 'shine-customer-list',
  templateUrl: templateUrl,
  inputs: [ 'customers' ]
})

export class CustomerListComponent {
  customers: Customer[];
}
