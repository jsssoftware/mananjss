import { error } from '@angular/compiler/src/util';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormControl, ValidationErrors,FormGroup } from '@angular/forms';

@Component({
    selector: 'print-error',
    templateUrl: './print-error.component.html',
    providers: []
})
export class PrintErrorComponent implements OnInit{
    @Input("control")
    form: FormGroup;
    showerror:any=""
    errorMsgList: any = [];
    errorMessage = {
        'required'  : (params :any)  => `This field is required`,
        'maxlength' : (params:any)  => `Maximum ${params.requiredLength} characters are allowed`,
        'minlength' : (params:any)  => `Minimum ${params.requiredLength} characters are required`,
        'pattern'   : (params:any)  => `Invalid format`,
        'min'       : (params:any)  => `Minimum amount should be ₹ ${params.min}`,
        'whitespace': (params:any)   => `White spaces are not allowed`
    };
    ngOnInit() {
       /*  this.form.valueChanges.subscribe(change=>{ 
            this.errorMsgList = [];
            Object.keys(this.form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.form.get(key)?.errors;
                if (controlErrors != null) {
                    this.form.controls[key].touched || this.form.controls[key].dirty ?
                    this.errorMsgList.push({
                        key:key,
                        value :this.form.controls[key]
                    }) : '';
                }
            
              });
          }) */

        this.listError();
       
    }

    listError(){
        this.errorMsgList = [];
        Object.keys(this.form.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.form.get(key)?.errors;
            if (controlErrors != null) {
                
                if(this.form.controls[key].errors != null ){
                    this.errorMsgList.push({
                        key:key,
                        value :this.form.controls[key]
                    });
                }
            }
          });
    }

}