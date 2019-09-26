import AuthComponent from 'views/AuthComponent/AuthComponent.jsx';
import GameComponent from 'views/GameComponent/GameComponent.jsx';
import LandingComponent from 'views/LandingComponent/LandingComponent.jsx';

var indexRoutes = [
    {path: '/auth', name: 'AuthComponent', component: AuthComponent},
    {path: '/games', name: 'GameComponent', component: GameComponent},
    {path: '/', name: 'LandingComponent', component: LandingComponent},
];

export default indexRoutes;
