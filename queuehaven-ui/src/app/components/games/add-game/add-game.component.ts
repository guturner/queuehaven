import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styles: [ './add-game.component.scss' ]
})
export class AddGameComponent implements OnInit {
    private readonly GENRES: string[] = ['DECK BUILDER', 'DUNGEON CRAWLER', 'PARTY', 'STRATEGY', 'TABLETOP RPG', 'OTHER'];
    private readonly DEFAULT_GENRE = 'OTHER';

    formGroup: FormGroup;

    imagePath: string;
    isBadImgPath: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private gameService: GameService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm = () => {
        this.formGroup = this.formBuilder.group({
            'name': [null, Validators.required],
            'genre': [this.DEFAULT_GENRE, Validators.required],
            'minNumOfPlayers': [1, Validators.required],
            'maxNumOfPlayers': [2, Validators.required],
            'imagePath': [null, [Validators.required, this.imageValidator]]
        });
    };

    imageValidator = (control: AbstractControl): ValidationErrors => {
        this.imagePath = control.value;

        if (this.imagePath == null || this.isBadImgPath) {
            return this.setBadImageError();
        } else {
            this.isBadImgPath = false;
            return null;
        }
    };

    isNameFieldInvalid = (): boolean => {
        return this.formGroup.get('name').touched && this.formGroup.get('name').invalid;
    };

    isGenreFieldInvalid = (): boolean => {
        return this.formGroup.get('genre').touched && this.formGroup.get('genre').invalid;
    };

    isMinNumOfPlayersFieldInvalid = (): boolean => {
        return this.formGroup.get('minNumOfPlayers').touched && this.formGroup.get('minNumOfPlayers').invalid;
    };

    isMaxNumOfPlayersFieldInvalid = (): boolean => {
        return this.formGroup.get('maxNumOfPlayers').touched && this.formGroup.get('maxNumOfPlayers').invalid;
    };

    setBadImageError = (): ValidationErrors => {
        this.isBadImgPath = true;

        return {
            badImagePath: true
        }
    };

    clearAllImageErrors = () => {
        this.isBadImgPath = false;
        this.formGroup.get('imagePath').updateValueAndValidity();
    };

    isImagePathFieldInvalid = (): boolean => {
        return this.formGroup.get('imagePath').touched && this.formGroup.get('imagePath').invalid;
    };

    isFormInvalid = (): boolean => {
        return this.formGroup.invalid;
    };

    submitForm = () => {
        this.gameService.addGame(this.formGroup.value)
            .subscribe(() => {
                this.gameService.getGames();
                this.resetForm();
            });
    };

    resetForm = () => {
        this.imagePath = null;
        this.formGroup.reset();
    };
}
