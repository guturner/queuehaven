import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Game } from 'app/models/game';

@Injectable()
export class GameService {

    constructor(private http: HttpClient) { }

    addGame = (game: Game) => {
        const gamesUrl: string = `${environment.baseUrl}/api/v1/games`;
        return this.http.post<Game>(gamesUrl, game);
    }
}