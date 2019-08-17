import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[numbersonly]'
})
export class NumbersOnlyDirective {
    private el: NgControl;

    constructor(private ngControl: NgControl) {
        this.el = ngControl;
    }

    @HostListener('input', ['$event.target.value'])
    onInput = (value: string) => {
        this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
    };
}