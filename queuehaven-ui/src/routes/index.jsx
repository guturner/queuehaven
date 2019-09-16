import LandingComponent from 'views/LandingComponent/LandingComponent.jsx';
import AuthComponent from 'views/AuthComponent/AuthComponent.jsx';
//import { ProfileComponent } from './components/profile/profile.component';
//import { AddGameComponent } from './components/games/add-game/add-game.component';
//import { ViewGamesComponent } from './components/games/view-games/view-games.component';
//import { QueueComponent } from './components/queue/queue.component';

var indexRoutes = [
    { path: "/auth", name: "AuthComponent", component: AuthComponent },
    { path: "/", name: "LandingComponent", component: LandingComponent },

	//{ path: 'add-game', component: AddGameComponent, canActivate: [AuthGuard] },
	//{ path: 'games', component: ViewGamesComponent, canActivate: [AuthGuard] },
	//{ path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
	//{ path: 'queue/:username', component: QueueComponent, canActivate: [AuthGuard] }
];

export default indexRoutes;
