import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from "@angular/forms";


function skuValidator(control: FormControl): { [s: string]: boolean } | null {
  if (!control.value.match(/^123/)) {
    return {invalidSku: true}
  }

  return null;
}

@Component({
  selector: 'app-demo-form-sku',
  templateUrl: './demo-form-sku.component.html',
  styleUrls: ['./demo-form-sku.component.css']
})
export class DemoFormSkuComponent implements OnInit {
  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['', Validators.compose([
        Validators.required,
        skuValidator])],
    })

    this.sku = this.myForm.controls['sku'];

    this.sku.valueChanges.subscribe(
      (value: string) => {
        console.log('sku changed to: ', value);
      }
    )

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to: ', form);
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {
    console.log('You submitted value: ', form);
  }

}
