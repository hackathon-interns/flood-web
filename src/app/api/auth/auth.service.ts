import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import moment from 'moment';

import { LoginRequest } from '.';
import { environment } from '../../../environments/environment';
import { SignupRequest } from './requests/signup-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
    get url(): string {
        return environment.apiUrl;
    }

    constructor(private http: HttpClient) {}

    public login(request: LoginRequest) {
        return this.http.post<any>(`${this.url}/token/`, { ...request }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    public signup(request: SignupRequest) {
        return this.http.post<any>(`${this.url}/users/`, { ...request })
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('access_token', authResult.access);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        const access_token = localStorage.getItem('access_token');

        return access_token != null && access_token != undefined;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at') ?? '';
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    public getUser() {
        return this.http.get<any>(`${this.url}/users/me/`)
    }
}
