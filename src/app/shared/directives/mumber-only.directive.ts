import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMumberOnly]',
  standalone: true
})
export class MumberOnlyDirective {

  constructor(private el:ElementRef) { }

  @HostListener("input",['$event'])onInputChange(event:any){
    const initialValue=this.el.nativeElement.value;
    if(initialValue==0){
      this.el.nativeElement.value="";

    }else{
      this.el.nativeElement.value=initialValue.replace(/[^0-9]*/g,"");
      if(initialValue!==this.el.nativeElement.value){
        event.stopPropagration();
      }
    }

  }
}
