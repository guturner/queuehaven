import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JWT } from 'app/models/jwt';

@Injectable()
export class UserService {

    constructor(
        private authService: AuthService,
        private http: HttpClient) { }

    getUserByUsername = (username: string): Observable<User> => {
        const usersUrl: string = `${environment.baseUrl}/api/v1/users/username/${username}`;
        return this.http.get<User>(usersUrl, { headers: this.buildApiUserAuthHeader() });
    };

    createUser = (user: User) => {
        const usersUrl: string = `${environment.baseUrl}/api/v1/users`;
        return this.http.post<User>(usersUrl, user, { headers: this.buildApiUserAuthHeader() });
    }

    /**
     * Used for secure operations performed while the user is logged out.
     */
    private buildApiUserAuthHeader = (): HttpHeaders => {
        const jwt: JWT = this.authService.getCurrentApiUserJwt();
        return new HttpHeaders().set('Authorization', `${jwt.prefix}${jwt.token}`);
    };
}