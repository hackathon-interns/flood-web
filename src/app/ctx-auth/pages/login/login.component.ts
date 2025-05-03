import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { AuthService, LoginRequest } from '../../../api/auth';
import { ReactiveFormAbstract } from '../../../libraries/abstracts';
import { LayoutService } from '../../../ctx-layout/layout/service/layout.service';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'app-auth-login',
    templateUrl: 'login.component.html',
    standalone: false
})
export class LoginComponent extends ReactiveFormAbstract implements OnInit {
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

    async onClickLogin(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        const request: LoginRequest = {
            username: this.form.value.email,
            password: this.form.value.password
        };

        this.authService.login(request).subscribe(() => {
            this.router.navigateByUrl('/');
        });
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({
            email: {
                required: 'Informe o E-mail'
            },
            password: {
                required: 'Informe a Senha'
            }
        });
    }
}
