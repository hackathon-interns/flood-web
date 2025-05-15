import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import moment from 'moment';

import { LoginRequest } from '.';
import { SignupRequest } from './requests/signup-request';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    refreshIntervalId: any;

    get url(): string {
        return environment.apiUrl;
    }

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    public getUser() {
        return this.http.get<any>(`${this.url}/users/me/`);
    }

    public login(request: LoginRequest) {
        return this.http.post<any>(`${this.url}/token/`, { ...request }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    public signup(request: SignupRequest) {
        return this.http.post<any>(`${this.url}/users/`, { ...request });
    }

    private refreshToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return;

        return this.http.post<any>(`${this.url}/token/refresh`, { refresh: refreshToken }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    private setSession(authResult: any) {
        const decodedToken = this.decodeJwt(authResult.access);
        const expiresAt = moment().add(decodedToken.exp, 'second');

        localStorage.setItem('access_token', authResult.access);
        localStorage.setItem('refresh_token', authResult.refresh);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        
        this.startTokenRefreshScheduler();
    }

    logout() {
        this.stopTokenRefreshScheduler();
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('refresh_token');
        this.router.navigateByUrl('/login');
    }

    public isLoggedIn() {
        const expirationDate = this.getExpiration();
        if (!expirationDate) return false;

        const now = moment();

        return moment(expirationDate).diff(now, 'seconds') > 0;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        if (!expiration) return false;

        const expiresAt = JSON.parse(expiration);

        return moment(expiresAt).toDate();
    }

    getAccessToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    startTokenRefreshScheduler() {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId);
        }

        this.refreshIntervalId = setInterval(() => {
            const expiresAt = this.getExpiration();
            if (!expiresAt) return;

            const now = moment();
            const timeLeft = moment(expiresAt).diff(now, 'seconds');

            if (timeLeft < 60 && timeLeft > 0) {
                this.refreshToken()?.subscribe();
            }

            if (timeLeft <= 0) {
                this.logout();
            }
        }, 30 * 1000);
    }

    stopTokenRefreshScheduler() {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId);
            this.refreshIntervalId = null;
        }
    }

    decodeJwt(token: string): any {
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            return JSON.parse(payloadJson);
        } catch (e) {
            console.error('Invalid token', e);
            return null;
        }
    }
}
