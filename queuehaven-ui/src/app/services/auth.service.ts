import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JWT } from 'app/models/jwt';

import * as moment from 'moment';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    loginApiUser = (): Observable<JWT> => {
      return this.login(environment.serviceAccount.username, environment.serviceAccount.password);
    };

    logoutApiUser = () => {
      localStorage.removeItem('api-jwt');
    };

    getCurrentApiUserJwt = (): JWT => {
      return JSON.parse(localStorage.getItem('api-jwt'));
    }

    login = (username: string, password: string): Observable<JWT> => {
        let httpHeaders: HttpHeaders = this.generateBasicAuthHeaders(username, password);
        let authApiUrl: string = `${environment.baseUrl}${environment.authEndpoint}`;
        
        return this.http.post<JWT>(authApiUrl, null, { headers: httpHeaders})
            .pipe(
              map(jwt => {
                if (jwt && jwt.token) {
                  jwt.requestedTime = moment();
                  localStorage.setItem(this.getUserKey(username), JSON.stringify(jwt));
                }
                return jwt;
              })
            );
    };

    logout = () => {
      localStorage.removeItem('jwt');
    };

    getCurrentJwt = (): JWT => {
        return JSON.parse(localStorage.getItem('jwt'));
    };

    private generateBasicAuthHeaders = (username: String, password: String): HttpHeaders => {
        let encodedUsernamePassword = btoa(`${username}:${password}`);
        
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedUsernamePassword}`
        });
    };

    private getUserKey = (username?: string): string => {
      return username == environment.serviceAccount.username ? 'api-jwt' : 'jwt';
    }
}