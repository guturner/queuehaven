import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Game } from 'app/models/game';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class GameService {

    private gamesSubject: Subject<Game[]> = new Subject<Game[]>();

    constructor(private http: HttpClient) { }

    addGame = (game: Game) => {
        const gamesUrl: string = `${environment.baseUrl}/api/v1/games`;
        return this.http.post<Game>(gamesUrl, game);
    };

    getGame = (gameId: string): Observable<Game> => {
        const gamesUrl: string = `${environment.baseUrl}/api/v1/games/${gameId}`;
        return this.http.get<Game>(gamesUrl);
    };

    getGames = (): Subject<Game[]> => {
        const gamesUrl: string = `${environment.baseUrl}/api/v1/games`;
        this.http.get<Game[]>(gamesUrl)
            .subscribe(games => {
                this.gamesSubject.next(games);
            });

        return this.gamesSubject;
    };
}