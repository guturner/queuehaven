import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styles: [ './landing.component.scss' ]
})
export class LandingComponent implements OnInit {
    
    calendarPlugins = [dayGridPlugin];
    events: Event[];

    constructor(
        private authService: AuthService,
        private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents().subscribe(events => {
            this.events = events;
        })
    }

    isLoggedIn = (): boolean => {
        return this.authService.isLoggedIn();
    };

    isLoggedOut = (): boolean => {
        return this.authService.isLoggedOut();
    };
}
