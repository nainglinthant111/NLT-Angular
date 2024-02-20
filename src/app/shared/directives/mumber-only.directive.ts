import { Directive } from '@angular/core';

@Directive({
  selector: '[appMumberOnly]',
  standalone: true
})
export class MumberOnlyDirective {

  constructor() { }

}
