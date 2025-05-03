import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Device } from '.';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DevicesService {
    get url(): string {
        return `${environment.apiUrl}/devices`;
    }

    constructor(private http: HttpClient) {}

    public adicionar(request: any) {
        return this.http.post<any>(`${this.url}`, request);
    }

    public editar(request: any) {
        return this.http.put<any>(`${this.url}/${request.id}`, request);
    }

    public excluir(request: any) {
        return this.http.delete<any>(`${this.url}/${request.id}`);
    }

    public obter(request: any) {
        return this.http.get<Device>(`${this.url}/${request.id}`);
    }

    public obterTodos() {
        return this.http.get<Device[]>(`${this.url}`);
    }
}
