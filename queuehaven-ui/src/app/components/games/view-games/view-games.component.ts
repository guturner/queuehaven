import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'app/models/game';
import { Observable, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-view-games',
    templateUrl: './view-games.component.html',
    styles: [ './view-games.component.scss' ]
})
export class ViewGamesComponent implements OnInit {

    gamesSubject: Subject<Game[]>;
    games$: Observable<Game[]>;

    displayedColumns: string[] = ['imagePath', 'name', 'minNumOfPlayers', 'maxNumOfPlayers'];

    constructor(
        private gameService: GameService) { }

    ngOnInit() {
        this.gamesSubject = this.gameService.getGames();
        this.games$ = this.gamesSubject.asObservable();
    }
}
