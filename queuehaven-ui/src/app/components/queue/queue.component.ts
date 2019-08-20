import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QueueEntry } from 'app/models/queue-entry';
import { QueueService } from 'app/services/queue.service';
import { Game } from 'app/models/game';
import { GameService } from 'app/services/game.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styles: [ './queue.component.scss' ]
})
export class QueueComponent implements OnInit {
    
    queueEntries$: Observable<QueueEntry[]>;
    games$: Observable<Game[]>;
    games: Game[];

    formGroup: FormGroup;

    username: string;

    displayedColumns: string[] = ['imagePath', 'name', 'action'];

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private queueService: QueueService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.games = [];

        this.createForm();
        this.getQueueEntries();
    }

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'gameId': [null, Validators.required]
        });
    };

    getQueueEntries = () => {
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.queueEntries$ = this.queueService.getQueueEntries(this.username);
            this.games$ = this.gameService.getGames().asObservable();
            this.games$.subscribe((games: Game[]) => {
                for (let game of games) {
                    this.games.push(game);
                }
            });
        });
    };

    removeGameFromQueue = (queueEntryId: string) => {
        this.queueService.deleteQueueEntry(queueEntryId).subscribe(() => {
            this.getQueueEntries();
        });
    };

    getGame = (gameId: string): Game => {
        for (let game of this.games) {
            if (game.gameId == gameId) {
                return game;
            }
        }
        return null;
    };

    buildQueueEntry = (): QueueEntry => {
        let queueEntry = new QueueEntry()
        queueEntry.gameId = this.formGroup.get('gameId').value;
        queueEntry.username = this.username;
        return queueEntry;
    };

    isFormInvalid = (): boolean => {
        return this.formGroup.invalid;
    };

    submitForm = () => {
        this.queueService.addQueueEntry(this.buildQueueEntry())
            .subscribe(() => {
                this.getQueueEntries();
            });
    };

}
