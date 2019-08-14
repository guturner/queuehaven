import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserService } from 'app/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ '../auth.component.scss' ]
})
export class SignupComponent implements OnInit {
    
    formGroup: FormGroup;

    isFormValid = false;
    isUsernameTaken = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService) {
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
        let isUsernameUnique = false;

        if (username == null) {
            isUsernameUnique = false;
        } else {
            this.userService.getUserByUsername(username)
                .then(user => {
                    isUsernameUnique = user != null;
                })
                .catch(error => {
                    isUsernameUnique = true;
                });
        }

        return isUsernameUnique;
    };

    validateForm = () => {
        this.isFormValid = this.formGroup.valid && this.isUsernameUnique(this.formGroup.get('username').value);
        console.log(this.isFormValid);
    };

    submitForm = () => {
        this.validateForm();
    };
}
