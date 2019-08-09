import { Component, OnInit, Renderer } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styles: [ ]
})
export class LandingComponent implements OnInit {
    
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.login().subscribe((response) => {
            console.log(response);
        });
    }

}
