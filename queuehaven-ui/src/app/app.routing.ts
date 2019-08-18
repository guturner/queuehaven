import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NoAuthGuard } from './guards/noauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AddGameComponent } from './components/games/add-game/add-game.component';
import { ViewGamesComponent } from './components/games/view-games/view-games.component';

const routes: Routes =[
    { path: '', component: LandingComponent },
    { path: 'auth', component: AuthComponent, canActivate: [NoAuthGuard] },
    { path: 'profiles/:username', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'add-game', component: AddGameComponent, canActivate: [AuthGuard] },
    { path: 'games', component: ViewGamesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
