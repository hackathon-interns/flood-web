import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../libraries/enums';
import { Device, DevicesService } from '../../../api/devices';
import { ModalBaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-excluir-device',
    templateUrl: 'excluir-device.component.html',
    standalone: false
})
export class ExcluirDeviceComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) device!: Device;
    titulo: string = 'Deseja excluir esse device?';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: DevicesService
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    onClickExcluir(): void {
        this.block('Excluindo...');
        this.service.excluir({ id: this.device.id }).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Device Excluído');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}
