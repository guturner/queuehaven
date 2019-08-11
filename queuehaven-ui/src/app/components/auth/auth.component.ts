import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styles: [ ]
})
export class AuthComponent implements OnInit {
    
    constructor(private authService: AuthService) { }

    ngOnInit() {
        
    }

}