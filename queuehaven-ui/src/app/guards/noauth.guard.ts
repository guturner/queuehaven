import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { User } from 'app/models/user';

@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate = (): boolean => {
        const user: User = JSON.parse(localStorage.getItem('user'));
        
        if (user != null) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    };
}