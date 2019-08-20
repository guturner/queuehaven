import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [ ]
})
export class SidenavComponent implements OnInit {

    ngOnInit() {

    }

    getCurrentUser = (): User => {
        return JSON.parse(localStorage.getItem('user'));
    };

    buildQueueRoute = (): string => {
        return this.isLoggedIn() ? `/#/queue/${this.getCurrentUser().username}` : '';
    };

    isLoggedIn = (): boolean => {
        return localStorage.getItem('user') != null;
    };

    isAdmin = (): boolean => {
        return true; // TODO
    };
}