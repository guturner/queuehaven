import { AuthService } from './auth.service';

export abstract class RestService {

    constructor(private authService: AuthService) { }

    // TODO Generic getJwt calls
}