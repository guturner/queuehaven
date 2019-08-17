import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: [ ]
})
export class ProfileComponent implements OnInit {
    
    username: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.username = params['username'];
        });
    }

}
