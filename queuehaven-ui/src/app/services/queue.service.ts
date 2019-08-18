import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { QueueEntry } from 'app/models/queue-entry';
import { Observable } from 'rxjs';

@Injectable()
export class QueueService {

    constructor(private http: HttpClient) { }

    addQueueEntry = (queueEntry: QueueEntry) => {
        const queuesUrl: string = `${environment.baseUrl}/api/v1/queues`;
        return this.http.post<QueueEntry>(queuesUrl, queueEntry);
    };

    deleteQueueEntry = (queueEntryId: string) => {
        const queuesUrl: string = `${environment.baseUrl}/api/v1/queues/${queueEntryId}`;
        return this.http.delete<QueueEntry>(queuesUrl);
    };

    getQueueEntries = (username: string): Observable<QueueEntry[]> => {
        const queuesUrl: string = `${environment.baseUrl}/api/v1/queues/username/${username}`;
        return this.http.get<QueueEntry[]>(queuesUrl);
    };
}