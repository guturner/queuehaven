import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NoSpacesDirective } from 'app/directives/nospaces.directive';
import { ProfileComponent } from './profile/profile.component';
import { NoAuthGuard } from 'app/guards/noauth.guard';
import { AuthGuard } from 'app/guards/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        AuthComponent,
        LandingComponent,
        LoginComponent,
        ProfileComponent,
        SignupComponent,
        NoSpacesDirective
    ],
    providers: [
        AuthGuard,
        NoAuthGuard
    ],
    entryComponents: [ ],
    exports:[ LandingComponent ]
})
export class ComponentsModule { }
