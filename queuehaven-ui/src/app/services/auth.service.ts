import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWT } from 'app/models/jwt';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    async getJwt(): Promise<JWT> {
        let httpHeaders: HttpHeaders = this.generateBasicAuthHeaders(environment.serviceAccount.username, environment.serviceAccount.password);
        let authApiUrl: string = `${environment.baseUrl}${environment.authEndpoint}`;
        
        return await this.http.post<JWT>(authApiUrl, null, { headers: httpHeaders}).toPromise();
    }

    generateBasicAuthHeaders(username: String, password: String): HttpHeaders {
        let encodedUsernamePassword = btoa(`${username}:${password}`);
        
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedUsernamePassword}`
        });
    }
}