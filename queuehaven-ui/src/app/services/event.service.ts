import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Event } from 'app/models/event';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class EventService {

    private eventsSubject: Subject<Event[]> = new Subject<Event[]>();

    constructor(private http: HttpClient) { }

    addEvent = (event: Event) => {
        const eventsUrl: string = `${environment.baseUrl}/api/v1/events`;
        return this.http.post<Event>(eventsUrl, event);
    };

    getEvent = (eventId: string): Observable<Event> => {
        const eventsUrl: string = `${environment.baseUrl}/api/v1/events/${eventId}`;
        return this.http.get<Event>(eventsUrl);
    };

    getEvents = (): Subject<Event[]> => {
        const eventsUrl: string = `${environment.baseUrl}/api/v1/events`;
        this.http.get<Event[]>(eventsUrl)
            .subscribe(events => {
                this.eventsSubject.next(events);
            });

        return this.eventsSubject;
    };
}