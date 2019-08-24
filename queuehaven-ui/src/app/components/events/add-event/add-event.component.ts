import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'app/services/event.service';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styles: [ './add-event.component.scss' ]
})
export class AddEventComponent implements OnInit {

    formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private eventService: EventService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'title': [null, Validators.required],
            'date': [null, Validators.required]
        });
    };

    isFormInvalid = (): boolean => {
        return this.formGroup.invalid;
    };

    submitForm = () => {
        this.eventService.addEvent(this.formGroup.value)
            .subscribe(() => {
                
            });
    };
}
