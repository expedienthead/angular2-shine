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
      return Observable.forkJoin(
        this._http.get('/state.json')
            .map(res => res.json())
            .map(r => {
              let states: Array<State> = [];
              if (r) {
                states = r.map((v: any) => new State(v));
              }
              return states;
            }),
        this._http.get(`/customer/${id}.json`)
                  .map(res => res.json())
                  .map(r => {
                    return new CustomerDetails(r);
                  })
      );
  }

  update(id: string, customerDetails: CustomerDetails) {
    let param: { [s: string]: CustomerDetails } = { 'customer': customerDetails };
    return this._http
               .put('/customer/' + id, JSON.stringify(param));
  }
}
