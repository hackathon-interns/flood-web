import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { EntityListAbstract } from '../../../libraries/abstracts';
import { NotificationType } from '../../../libraries/enums';
import { Device, DevicesService } from '../../../api/devices';
import { AuthService } from '../../../api/auth';


@Component({
    selector: 'ctx-faculdade-listar-devices',
    templateUrl: 'listar-devices.component.html',
    standalone: false
})
export class ListarDevicesComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    devices!: Device[];
    selectedDevice: Device | null = null;
    selectedDevices: Device[] = [];
    userCanEdit: {[key: string]: boolean} = {};

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: DevicesService,
        private authService: AuthService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.obterDados();
        this.initializePermissions();
    }

    private initializePermissions() {
        this.authService.getUser().subscribe(user => {
            if (this.devices) {
                this.devices.forEach(device => {
                    this.userCanEdit[device.id] = user?.id === device.user;
                });
            }
        });
    }

    canEdit(device: Device): boolean {
        return this.userCanEdit[device.id] || false;
    }
    
    onClickAtualizar(): void {
        this.block();
        this.obterDados();
    }

    onClickAdicionar(): void {
        this.adicionarVisible = true;
    }

    onAdicionarVisibleEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onAdicionarSuccessEvent(event: any): void {
        this.adicionarVisible = false;
        this.onClickAtualizar();
    }

    onAdicionarCancelationEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onClickEditar(device: Device) {
        if (!this.canEdit(device)) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Erro', 
                detail: 'Você não tem permissão para editar este dispositivo' 
            });
            return;
        }
        this.selectedDevice = device;
        this.editarVisible = true;
    }

    onEditarVisibleEvent(event: any): void {
        this.editarVisible = false;
        this.selectedDevice = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.editarVisible = false;
        this.selectedDevice = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.editarVisible = false;
        this.selectedDevice = null;
    }

    private obterDados(): void {
        this.service.obterTodos().subscribe(
            (res) => {
                this.devices = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}