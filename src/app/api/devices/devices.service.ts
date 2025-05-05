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
        const formData = new FormData();
        
        // Append all fields to FormData
        formData.append('user', request.user);
        formData.append('name', request.name);
        formData.append('identifier', request.identifier);
        formData.append('longitude', request.longitude.toString());
        formData.append('latitude', request.latitude.toString());
        
        // Append images if they exist
        if (request.front_photo) {
            formData.append('front_photo', request.front_photo);
        }
        if (request.side_photo) {
            formData.append('side_photo', request.side_photo);
        }

        return this.http.post<string>(`${this.url}/`, formData);
    }

    public editar(request: EditarDeviceRequest) {
        const formData = new FormData();
        
        formData.append('user', request.user);
        formData.append('name', request.name);
        formData.append('identifier', request.identifier);
        formData.append('longitude', request.longitude.toString());
        formData.append('latitude', request.latitude.toString());
        
        if (request.front_photo) {
            formData.append('front_photo', request.front_photo);
        }
        if (request.side_photo) {
            formData.append('side_photo', request.side_photo);
        }

        return this.http.put<string>(`${this.url}/${request.id}/`, formData);
    }

    public obter(request: ObterDeviceRequest) {
        return this.http.get<Device>(`${this.url}/${request.id}/`);
    }

    public obterTodos() {
        return this.http.get<Device[]>(`${this.url}/`);
    }
}
