import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { AuthService, LoginRequest } from '../../../api/auth';
import { NotificationType } from '../../../libraries/enums';
import { ReactiveFormAbstract } from '../../../libraries/abstracts';
import { SignupRequest } from '../../../api/auth/requests/signup-request';
import { LayoutService } from '../../../ctx-layout/layout/service/layout.service';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'app-auth-sign-up',
    templateUrl: 'sign-up.component.html',
    standalone: false
})
export class SignUpComponent extends ReactiveFormAbstract implements OnInit {
    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        formBuilder: FormBuilder,
        private authService: AuthService,
        public layoutService: LayoutService,
        private router: Router
    ) {
        super(messageService, loadingService, formBuilder);
        this.atualizarMensagensValidacao();
    }

    ngOnInit(): void {
        this.criarFormulario();
    }

    verificarTemaEscuro(): boolean {
        return this.layoutService.isDarkTheme() ?? false;
    }

    async onClickSignUp(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        if (this.form.value.password != this.form.value.confirmationPassword) {
            this.notify(NotificationType.ERROR, 'Senhas não coincidem.');
            return;
        }

        this.block('Criando Conta...');
        const request: SignupRequest = {
            username: this.form.value.username,
            email: this.form.value.email,
            password: this.form.value.password,
            notify_on_new_station: false
        };

        this.authService.signup(request).subscribe(
            (res) => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Usuário cadastrado com sucesso.');
                const loginRequest: LoginRequest = {
                    email: res.email,
                    password: this.form.value.password
                };
                this.login(loginRequest);
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private login(request: LoginRequest) {
        this.block('Logando...');
        this.authService.login(request).subscribe(
            () => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Usuário logado com sucesso.');
                this.router.navigateByUrl('/');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            username: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, Validators.required],
            confirmationPassword: [null, Validators.required]
        });
    }

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({
            username: {
                required: 'Informe o Nome de usuário'
            },
            email: {
                required: 'Informe o E-mail'
            },
            password: {
                required: 'Informe a Senha'
            },
            confirmationPassword: {
                required: 'Informe a Confirmação de Senha'
            }
        });
    }
}
