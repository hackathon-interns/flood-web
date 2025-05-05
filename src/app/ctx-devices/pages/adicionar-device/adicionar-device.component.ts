import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { AdicionarDeviceRequest, DevicesService } from '../../../api/devices';
import { NotificationType } from '../../../libraries/enums';
import { ModalBaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { UploadEvent } from 'primeng/fileupload';
import { AuthService } from '../../../api/auth';

@Component({
    selector: 'ctx-faculdade-adicionar-device',
    templateUrl: 'adicionar-device.component.html',
    standalone: false
})
export class AdicionarDeviceComponent extends ModalBaseAbstract implements OnInit {
    titulo: string = 'Adicionar Device';
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
        this.obterUsuario();
    }

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    obterUsuario(): void {
        this.authService.getUser().subscribe(o => this.usuarioId = o.id);
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
    

    async onClickSalvar(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }
        
        this.block('Salvando...');

        const request: AdicionarDeviceRequest = {
            user: this.usuarioId,
            name: this.form.value.name,
            identifier: this.form.value.identifier,
            front_photo: this.form.value.front_photo,
            side_photo: this.form.value.side_photo,
            longitude: this.form.value.longitude,
            latitude: this.form.value.latitude
        };

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
        this.form = this.formBuilder.group({
            user: [null],
            name: [null, [Validators.required]],
            identifier: [null, [Validators.required]],
            front_photo: [null],
            side_photo: [null],
            longitude: [null, [Validators.required]],
            latitude: [null, [Validators.required]]
        });
    }

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({
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
    
    getCurrentLocation(): void {
        if (!navigator.geolocation) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Erro', 
                detail: 'Geolocalização não suportada pelo navegador' 
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.form.patchValue({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Sucesso', 
                    detail: 'Localização atual obtida com sucesso' 
                });
            },
            (error) => {
                let message = 'Erro ao obter localização';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Permissão de localização negada';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Informação de localização indisponível';
                        break;
                    case error.TIMEOUT:
                        message = 'Tempo limite excedido ao obter localização';
                        break;
                }
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Erro', 
                    detail: message 
                });
            }
        );
    }
}
