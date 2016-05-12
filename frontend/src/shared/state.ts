export class State {
  id: number;
  name: string;
  code: string;

  constructor(obj: any) {
    this.id = obj && +obj.id || null;
    this.name = obj && obj.name || '';
    this.code = obj && obj.code || '';
  }
}
