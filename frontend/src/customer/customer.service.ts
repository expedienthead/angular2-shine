import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../shared/customer';
import 'rxjs/Rx';

@Injectable()
export class CustomerService {
  constructor(private _http: Http) {}

  getCustomers(params: string) {
    return this._http
      .get(`/customer.json?${params}`)
      .map(res => res.json())
      .map(r => {
        let results: Array<Customer> = [];
        if (r) {
          results = r.map((v: any) => new Customer(v));
        }
        return { results: results };
      });
  }

  getCustomerById(id: string) {
    return this._http
      .get(`/customer/${id}.json`)
      .map(res => res.json())
      .map(r => {
        return new Customer(r);
      });
  }
}
