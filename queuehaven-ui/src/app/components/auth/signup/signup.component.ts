import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ ]
})
export class SignupComponent implements OnInit {
    
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit = () => {
        
    };

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'username': [null, [Validators.required, this.usernameValidator]],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required]
        });
    };

    usernameValidator = (control: FormControl) => {
        let username: string = control.value;

        if (username && username.length < 3) {
            return {
                invalidEmail: username
            };
        } else {
            return null;
        }
    };

    submitForm = () => {

    };
}
