import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { LandingComponent } from './landing.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NoSpacesDirective } from 'app/directives/nospaces.directive';
import { ProfileComponent } from './profile/profile.component';
import { NoAuthGuard } from 'app/guards/noauth.guard';
import { AuthGuard } from 'app/guards/auth.guard';
import { AddGameComponent } from './games/add-game/add-game.component';
import { NumbersOnlyDirective } from 'app/directives/numbersonly.directive';
import { ViewGamesComponent } from './games/view-games/view-games.component';
import { QueueComponent } from './queue/queue.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule
  } from '@angular/material';
import { AddEventComponent } from './events/add-event/add-event.component';

@NgModule({
    imports: [
        CommonModule,
        FullCalendarModule,
        ReactiveFormsModule,

        // Material Modules
        MatButtonModule,
        MatCardModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule
    ],
    declarations: [
        AddEventComponent,
        AddGameComponent,
        AuthComponent,
        LandingComponent,
        LoginComponent,
        ProfileComponent,
        QueueComponent,
        SignupComponent,
        ViewGamesComponent,
        NoSpacesDirective,
        NumbersOnlyDirective
    ],
    providers: [
        AuthGuard,
        NoAuthGuard
    ],
    entryComponents: [ ],
    exports:[ LandingComponent ]
})
export class ComponentsModule { }
