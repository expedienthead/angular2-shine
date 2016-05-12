import { Component } from 'angular2/core';
import { CustomerSearchFormComponent } from './customer-search-form.component';

@Component({
  selector: 'shine-customer-search-form',
  template: `
    <shine-customer-search></shine-customer-search>
  `,
  directives: [ CustomerSearchFormComponent ]
})

export class CustomerComponent {
}
