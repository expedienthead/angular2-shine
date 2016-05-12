import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core';
import { CustomerService } from './customer.service';
import { Customer } from '../shared/customer';
import { CustomerListComponent } from './customer-list.component';
import { ControlGroup } from 'angular2/common';

const templateUrl = require('../templates/customers/customer-search-form.tpl.html');

@Component({
  selector: 'shine-customer-search',
  templateUrl: templateUrl,
  providers: [ CustomerService ],
  directives: [ CustomerListComponent ]
})

export class CustomerSearchFormComponent implements OnInit {
  searchedFor: string = '';
  page: number = 0;
  params: string = '';
  customers: Customer[] = [];
  customerForm: ControlGroup;

  constructor(private _customerService: CustomerService) {}

  ngOnInit(): any {
    this.search(null);
  }

  search(form: any) {
    this.customerForm = form;
    let searchTerm = !form ? '' : form.value['keywords'];
    if (!form) searchTerm = '';
    this.searchedFor = searchTerm;
    this.params = [
      `keywords=${searchTerm}`,
      `page=${this.page}`
    ].join('&');
    this._customerService.getCustomers(this.params)
      .subscribe(
        response => { this.customers = response.results; },
        error => console.log(error)
    );
  }

  previousPage(event: any) {
    if (this.page > 0) this.page -= 1;
    this.search(this.customerForm);
    event.preventDefault();
    event.stopPropagation();
  }

  nextPage(event: any) {
    this.page += 1;
    this.search(this.customerForm);
    event.preventDefault();
    event.stopPropagation();
  }
}
