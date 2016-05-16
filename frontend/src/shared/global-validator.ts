import { Control } from 'angular2/common';

export class GlobalValidator {
  static emailValidator(control: Control): {[key: string]: boolean} {
    if (control.value && !control.value.match(/[\w-]+@([\w-]+\.)+[\w-]+/)) {
      return {'invalidEmailAddress': true};
    }
  }

  static zipcodeValidator(control: Control): {[key: string]: boolean} {
    if (control.value && !control.value.match(/^\d{5}$/)) {
      return {'invalidZipCode': true};
    }
  }
}
