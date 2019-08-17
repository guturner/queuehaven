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
    private toggleButton: any;
    private sidebarVisible: boolean;

    private currentUser: User;

    constructor(
        public location: Location, 
        private element : ElementRef,
        private authService: AuthService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.currentUser = this.getCurrentUser();

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    getCurrentUser = (): User => {
        return JSON.parse(localStorage.getItem('user'));
    };

    buildProfileRoute = (): string => {
        return `/#/profiles/${this.getCurrentUser().username}`;
    };

    sidebarOpen = () => {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose = () => {
        const html = document.getElementsByTagName('html')[0];

        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle = () => {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isLoggedIn = (): boolean => {
        return localStorage.getItem('user') != null;
    };

    isLoggedOut = (): boolean => {
        return localStorage.getItem('user') == null;
    };

    logout = () => {
        this.authService.logout();
    };
}
