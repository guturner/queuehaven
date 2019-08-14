import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/models/user';
import { JWT } from 'app/models/jwt';

@Injectable()
export class UserService {

    constructor(
        private authService: AuthService,
        private http: HttpClient) { }

    async getUserByUsername(username: string): Promise<User> {
        let token: string;

        await this.authService.getJwt().then(jwt => {
            token = jwt.token;
        });

        let httpHeaders: HttpHeaders = this.generateBearerAuthHeaders(token);
        let usersApiUrl: string = `${environment.baseUrl}api/v1/users/username/${username}`;

        return await this.http.get<User>(usersApiUrl, { headers: httpHeaders }).toPromise();
    }

    generateBearerAuthHeaders(jwt: String): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        });
    }
}