import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ '../auth.component.scss' ]
})
export class LoginComponent implements OnInit {
    
    formGroup: FormGroup;

    isBadLogin: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'username': [null, Validators.required],
            'password': ['a', Validators.required]
        });
    };

    isUsernameFieldInvalid = (): boolean => {
        return this.formGroup.get('username').touched && (this.formGroup.get('username').invalid || this.isBadLogin);
    };

    isFormInvalid = (): boolean => {
        return this.formGroup.get('username').invalid || this.formGroup.get('password').invalid;
    };

    redirectToLandingPage = () => {
        this.router.navigate(["/"]);
    }

    submitForm = () => {
        this.authService.login(this.formGroup.get('username').value, this.formGroup.get('password').value)
            .subscribe(
                () => {
                    this.isBadLogin = false;
                    this.redirectToLandingPage()
                },
                (error) => {
                    this.formGroup.get('username').setErrors({ badLogin: true })
                    this.isBadLogin = true;
                }
            );
    };
}
