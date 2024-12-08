import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import autoAnimate from '@formkit/auto-animate';

@Directive({
  selector: '[appAutoAnimate]',
  standalone: true,
  exportAs: 'appAutoAnimate'
})
export class AutoAnimateDirective implements OnInit {
  @Input('appAutoAnimate') options: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    autoAnimate(
      this.el.nativeElement,
      this.options || {
        duration: 300,
        easing: 'ease-in-out',
      }
    );
  }
}
