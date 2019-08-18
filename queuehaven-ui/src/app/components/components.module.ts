import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

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

@NgModule({
    imports: [
        CommonModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule,
    ],
    declarations: [
        AddGameComponent,
        AuthComponent,
        LandingComponent,
        LoginComponent,
        ProfileComponent,
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
