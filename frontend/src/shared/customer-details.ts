import { State } from './state';

export class CustomerDetails {

  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  shipping_address_id: number;
  shipping_street: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zipcode: string;
  states: State[] = null;

  constructor(obj: any, states: State[]) {
    this.customer_id = obj && +obj.customer_id || null;
    this.first_name = obj && obj.first_name || '';
    this.last_name = obj && obj.last_name || '';
    this.email = obj && obj.email || '';
    this.username = obj && obj.username || '';
    this.shipping_address_id = obj && obj.shipping_address_id || null;
    this.shipping_city = obj && obj.shipping_city || '';
    this.shipping_state = obj && obj.shipping_state || '';
    this.shipping_zipcode = obj && obj.shipping_zipcode || '';
    this.states = states || [];
  }

}
