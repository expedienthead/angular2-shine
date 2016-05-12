import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { CustomerDetailsFormComponent } from './customer-details-form.component';

bootstrap(<any>CustomerDetailsFormComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
