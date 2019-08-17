import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { User } from 'app/models/user';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate = (): boolean => {
        const user: User = JSON.parse(localStorage.getItem('user'));
        
        if (user == null) {
            this.router.navigate(['auth']);
            return false;
        }

        return true;
    };
}