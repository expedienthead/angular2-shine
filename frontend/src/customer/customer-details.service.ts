import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { State } from '../shared/state';
import { CustomerDetails } from '../shared/customer-details';
import 'rxjs/Rx';

@Injectable()
export class CustomerDetailsService {

  constructor(private _http: Http) {}

  getCustomerDetailsById(id: string) {
      return this._http.get('/state.json')
                 .map(res => res.json())
                 .map(r => {
                   let states: Array<State> = [];
                   let customerDetails: CustomerDetails = null;
                   if (r) {
                     states = r.map((v: any) => new State(v));
                   }
                   return states;
                 });
  }
}
