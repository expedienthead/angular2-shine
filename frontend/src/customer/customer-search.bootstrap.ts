import { bootstrap } from 'angular2/platform/browser';
import { CustomerComponent } from './customer-search.component';
import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(<any>CustomerComponent, [ HTTP_PROVIDERS ]);
