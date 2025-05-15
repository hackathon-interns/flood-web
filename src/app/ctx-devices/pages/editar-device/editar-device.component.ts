import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../libraries/enums';
import { Device, DevicesService, EditarDeviceRequest } from '../../../api/devices';
import { ModalBaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { AuthService } from '../../../api/auth';
import { UploadEvent } from 'primeng/fileupload';

@Component({
    selector: 'ctx-faculdade-editar-device',
    templateUrl: 'editar-device.component.html',
    standalone: false
})
export class EditarDeviceComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) device!: Device;
    titulo: string = 'Editar Device';
    usuarioId: string;

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: DevicesService,
        private authService: AuthService
    ) {
        super(messageService, loadingService, formBuilder);
        this.atualizarMensagensValidacao();
    }

    ngOnInit(): void {
        this.criarFormulario();
        this.carregarFormulario();
    }

    onClickCancelar(): void {
        this.emitCancelation();
    }

    onUploadFotoFrontal(event: any) {
        const file = event.files[0];
        if (file) {
            this.form.patchValue({ front_photo: file });
            this.messageService.add({ 
                severity: 'info', 
                summary: 'Sucesso', 
                detail: 'Imagem Frontal selecionada' 
            });
        }
    }

    onUploadFotoLateral(event: any) {
        const file = event.files[0];
        if (file) {
            this.form.patchValue({ side_photo: file });
            this.messageService.add({ 
                severity: 'info', 
                summary: 'Sucesso', 
                detail: 'Imagem Lateral selecionada' 
            });
        }
    }

    removeFrontPhoto() {
        this.form.patchValue({ front_photo: null });
    }

    removeSidePhoto() {
        this.form.patchValue({ side_photo: null });
    }

    async onClickSalvar(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }
        
        this.block('Salvando...');

        const request: EditarDeviceRequest = {
            id: this.form.value.id,
            user: this.usuarioId,
            name: this.form.value.name,
            identifier: this.form.value.identifier,
            front_photo: this.form.value.front_photo,
            side_photo: this.form.value.side_photo,
            longitude: this.form.value.longitude,
            latitude: this.form.value.latitude
        };

        this.service.editar(request).subscribe(
            () => {
                this.unlock();
                this.emitSucces(true);
                this.notify(NotificationType.SUCCESS, 'Device Adicionado');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            id: [this.device.id, [Validators.required]],
            user: [this.device.user, [Validators.required]],
            name: [this.device.name, [Validators.required]],
            identifier: [this.device.identifier, [Validators.required]],
            front_photo: [this.device.front_photo],
            side_photo: [this.device.side_photo],
            longitude: [this.device.longitude, [Validators.required]],
            latitude: [this.device.latitude, [Validators.required]]
        });
    }

    private carregarFormulario(): void {
        this.form.patchValue({});
    }

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({
            user: {
                required: 'Informe o Usuário'
            },
            name: {
                required: 'Informe o Nome'
            },
            identifier: {
                required: 'Informe o Identificador'
            },
            longitude: {
                required: 'Informe a Longitude'
            },
            latitude: {
                required: 'Informe a Latitude'
            }
        });
    }
    
}
