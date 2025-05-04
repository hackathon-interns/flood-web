import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AdicionarDeviceRequest, Device, EditarDeviceRequest } from '.';
import { environment } from '../../../environments/environment';
import { ObterDeviceRequest } from './requests/obter-device-request';

@Injectable({ providedIn: 'root' })
export class DevicesService {
    get url(): string {
        return `${environment.apiUrl}/devices`;
    }

    constructor(private http: HttpClient) {}

    public adicionar(request: AdicionarDeviceRequest) {
        return this.http.post<string>(`${this.url}/`, request);
    }

    public editar(request: EditarDeviceRequest) {
        return this.http.put<string>(`${this.url}/${request.id}/`, request);
    }

    public obter(request: ObterDeviceRequest) {
        return this.http.get<Device>(`${this.url}/${request.id}/`);
    }

    public obterTodos() {
        return this.http.get<Device[]>(`${this.url}/`);
    }
}
