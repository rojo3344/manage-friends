import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }


  createNewFriendInstance(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      friends: [[]],
      age: [0, [Validators.required, this.validateNumber]],
      weight: [0, [Validators.required, this.validateNumber]]
    })
  }


  validateNumber(control: FormControl): { [s: string]: boolean } | null {
    return isNaN(control.value) ? { NaN: true } : null;
  }

}
