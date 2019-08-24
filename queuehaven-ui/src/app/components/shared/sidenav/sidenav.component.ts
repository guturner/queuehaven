import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [ ]
})
export class SidenavComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() { }

    getCurrentUser = (): User => {
        return JSON.parse(localStorage.getItem('user'));
    };

    buildQueueRoute = (): string => {
        return this.isLoggedIn() ? `/#/queue/${this.getCurrentUser().username}` : '';
    };

    isLoggedIn = (): boolean => {
        return this.authService.isLoggedIn();
    };

    isAdmin = (): boolean => {
        return true; // TODO
    };
}