import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { User } from 'app/models/user';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private currentUser: User;

    constructor(
        public location: Location, 
        private authService: AuthService) {
    }

    ngOnInit() {
        this.currentUser = this.getCurrentUser();
    }

    getCurrentUser = (): User => {
        return JSON.parse(localStorage.getItem('user'));
    };

    buildProfileRoute = (): string => {
        return this.isLoggedIn() ? `/#/profile/${this.getCurrentUser().username}` : '';
    };

    isLoggedIn = (): boolean => {
        return this.authService.isLoggedIn();
    };

    isLoggedOut = (): boolean => {
        return this.authService.isLoggedOut();
    };

    logout = () => {
        this.authService.logout();
    };
}
