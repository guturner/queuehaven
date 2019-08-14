import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ '../auth.component.scss' ]
})
export class SignupComponent implements OnInit {
    
    formGroup: FormGroup;

    isFormValid = false;
    isUsernameTaken = false;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit = () => {
        
    };

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'username': [null, [Validators.required, this.usernameValidator]],
            'password': ['a', Validators.required],
            'confirmPassword': ['a', Validators.required]
        });
    };

    usernameValidator = (control: AbstractControl): ValidationErrors => {
        let username: string = control.value;

        if (username && username.length < 3) {
            return {
                shortUsername: username
            };
        } else {
            return null;
        }
    };

    isUsernameUnique = (username: string): boolean => {
        if (username == null) {
            return false;
        }

        
    };

    validateForm = () => {
        this.isFormValid = this.formGroup.valid && this.isUsernameUnique(this.formGroup.get('username').value);
    };

    submitForm = () => {
        this.validateForm();
    };
}
