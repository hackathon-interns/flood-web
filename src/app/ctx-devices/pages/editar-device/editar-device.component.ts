import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../libraries/enums';
import { Device, DevicesService } from '../../../api/devices';
import { ModalBaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-editar-device',
    templateUrl: 'editar-device.component.html',
    standalone: false
})
export class EditarDeviceComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) device!: Device;
    titulo: string = 'Editar Device';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: DevicesService
    ) {
        super(messageService, loadingService, formBuilder);
        this.atualizarMensagensValidacao();
    }

    ngOnInit(): void {
        this.criarFormulario();
        this.carregarFormulario();
    }

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    async onClickSalvar(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        this.block('Salvando...');

        const request: any = {};

        this.service.editar(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Device Editado');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({});
    }

    private carregarFormulario(): void {
        this.form.patchValue({});
    }

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({});
    }
}
