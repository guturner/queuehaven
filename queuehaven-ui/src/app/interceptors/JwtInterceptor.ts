import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';
import { JWT } from 'app/models/jwt';
import { environment } from 'environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        const baseUrl: string = environment.baseUrl;
        const authUrl: string = `${environment.baseUrl}${environment.authEndpoint}`;
        
        if (request.url.startsWith(baseUrl) && request.url != authUrl && request.headers.get('Authorization') == null) {
            const currentJwt: JWT = this.authService.getCurrentJwt();

            if (currentJwt != null) {
                request = this.attachAuthHeaderToRequest(request, currentJwt);
            }
        }

        return next.handle(request);
    };

    private attachAuthHeaderToRequest = (request: HttpRequest<any>, jwt: JWT): HttpRequest<any> => {
        return request.clone({
            setHeaders: {
                Authorization: `${jwt.prefix}${jwt.token}`
            }
        });
    };

    private isJwtExpired = (jwt: JWT): boolean => {
        return false; // TODO
    }
}