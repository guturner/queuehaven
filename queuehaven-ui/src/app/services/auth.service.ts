import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JWT } from 'app/models/jwt';

import * as moment from 'moment';
import { User } from 'app/models/user';

@Injectable()
export class AuthService {
    private readonly API_JWT_KEY = 'api-jwt';
    private readonly JWT_KEY = 'jwt';
    private readonly USER_KEY = 'user';

    constructor(
      private http: HttpClient) { }

    loginApiUser = (): Observable<JWT> => {
      return this.login(environment.serviceAccount.username, environment.serviceAccount.password);
    };

    logoutApiUser = () => {
      localStorage.removeItem(this.API_JWT_KEY);
    };

    getCurrentApiUserJwt = (): JWT => {
      return JSON.parse(localStorage.getItem(this.API_JWT_KEY));
    }

    login = (username: string, password: string): Observable<JWT> => {
        let httpHeaders: HttpHeaders = this.generateBasicAuthHeaders(username, password);
        let authApiUrl: string = `${environment.baseUrl}${environment.authEndpoint}`;
        
        return this.http.post<JWT>(authApiUrl, null, { headers: httpHeaders})
            .pipe(
              map(jwt => {
                if (jwt && jwt.token) {
                  jwt.requestedTime = moment();
                  
                  const jwtKey: string = this.getJwtKey(username);

                  if (jwtKey != this.API_JWT_KEY) {
                    localStorage.setItem(this.USER_KEY, JSON.stringify(new User(username, password)));
                  }
                  localStorage.setItem(jwtKey, JSON.stringify(jwt));
                }
                return jwt;
              })
            );
    };

    logout = () => {
      localStorage.clear();
    };

    getCurrentJwt = (): JWT => {
        return JSON.parse(localStorage.getItem(this.JWT_KEY));
    };

    private generateBasicAuthHeaders = (username: String, password: String): HttpHeaders => {
        let encodedUsernamePassword = btoa(`${username}:${password}`);
        
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedUsernamePassword}`
        });
    };

    private getJwtKey = (username?: string): string => {
      return username == environment.serviceAccount.username ? this.API_JWT_KEY : this.JWT_KEY;
    }
}