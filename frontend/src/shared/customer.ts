export class Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: Date;

  constructor(obj: any) {
    this.id = obj && +obj.id || null;
    this.first_name = obj && obj.first_name || '';
    this.last_name = obj && obj.last_name || '';
    this.email = obj && obj.email || '';
    this.username = obj && obj.username || '';
    this.created_at = obj && new Date(obj.created_at) || null;
  }
}
