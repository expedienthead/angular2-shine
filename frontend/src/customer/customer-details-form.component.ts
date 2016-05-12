import { Component } from 'angular2/core';
import { RouteConfig } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { CustomerUpdateFormComponent } from './customer-update-form.component';

@Component({
  selector: 'shine-customer-details',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/customer/:id', name: 'CustomerDetails', component: CustomerUpdateFormComponent }
])

export class CustomerDetailsFormComponent {
}
