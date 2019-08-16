import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ '../auth.component.scss' ]
})
export class SignupComponent implements OnInit {
    
    formGroup: FormGroup;

    isApiError = false;
    isBadUsername = false;
    isUsernameTaken = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private userService: UserService) { }

    ngOnInit() {
        this.loginApiUser();
        this.createForm();
    }

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'username': [null, [Validators.required, this.usernameValidator], this.uniqueUsernameValidator],
            'password': ['a', Validators.required],
            'confirmPassword': ['a', Validators.required]
        });
    };

    usernameValidator = (control: AbstractControl): ValidationErrors => {
        this.clearAllUsernameErrors();

        const username: string = control.value;

        if (username == null || username.length < 3) {
            return this.setBadUsernameError();
        } else {
            return null;
        }
    };

    uniqueUsernameValidator = (control: AbstractControl): Observable<ValidationErrors> => {
        this.clearAllUsernameErrors();

        const username: string = control.value;
        const otherErrors: ValidationErrors = this.usernameValidator(control);
        
        if (otherErrors != null) {
            return of(otherErrors);
        } else {
            return this.userService.getUserByUsername(username)
            .pipe(
                map(user => of(this.setUsernameTakenError())),
                catchError(error => {
                    if (error.status == 404) {
                        return of(null);
                    } else {
                        return of(this.setApiError());
                    }
                })
            );
        }
    };

    isUsernameFieldInvalid = (): boolean => {
        return this.formGroup.get('username').touched && this.formGroup.get('username').invalid;
    };

    clearAllUsernameErrors = () => {
        this.isApiError = false;
        this.isBadUsername = false;
        this.isUsernameTaken = false;
    };

    setUsernameTakenError = (): ValidationErrors => {
        this.isUsernameTaken = true;

        return {
            usernameTaken: true
        };
    };

    setBadUsernameError = (): ValidationErrors => {
        this.isBadUsername = true;

        return {
            badUsername: true
        };
    };

    setApiError = (): ValidationErrors => {
        this.isApiError = true;

        return {
            apiError: true
        }
    };

    isFormInvalid = (): boolean => {
        return this.formGroup.get('username').invalid;
    };

    submitForm = () => {
        this.userService.createUser(this.formGroup.value);
        this.redirectToLandingPage();
        
    };

    resetForm = () => {
        this.formGroup.reset();
    };

    redirectToLandingPage = () => {
        this.resetForm();
        this.logoutApiUser();
        this.router.navigate(["/"])
    }

    /**
     * Service Account validates new sign up requests.
     */
    private loginApiUser = () => {
        this.authService.loginApiUser().subscribe();
    };

    private logoutApiUser = () => {
        this.authService.logoutApiUser();
    };
}
