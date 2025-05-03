import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { DevicesService } from '../../../api/devices';
import { NotificationType } from '../../../libraries/enums';
import { ModalBaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-adicionar-device',
    templateUrl: 'adicionar-device.component.html',
    standalone: false
})
export class AdicionarDeviceComponent extends ModalBaseAbstract implements OnInit {
    titulo: string = 'Adicionar Device';

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

        this.service.adicionar(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Device Adicionado');
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

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({});
    }
}
