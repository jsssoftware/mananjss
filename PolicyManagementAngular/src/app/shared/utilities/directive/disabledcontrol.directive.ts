import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective implements OnChanges{

  @Input()  disableControl:boolean ; 
  

  constructor( private ngControl : NgControl ) {
  }
 ngOnChanges(changes: SimpleChanges): void {
  const action = this.disableControl ? 'disable' : 'enable';
  this.ngControl.control[action]();
 }
}