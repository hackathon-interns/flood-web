import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

import { AppMenuitem } from './app.menuitem.component';
import { AuthService } from '../../../api/auth';
import { BaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../service/loading.service';
import { NotificationType } from '../../../libraries/enums';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu extends BaseAbstract {
    model: MenuItem[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private auth: AuthService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.carregarItensMenu();
    }

    carregarItensMenu(): void {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Map', icon: 'pi pi-fw pi-map-marker', routerLink: ['/map'] },
                    { label: 'Devices', icon: 'pi pi-fw pi-cog', routerLink: ['/devices'] }
                ]
            }
        ];

        if (this.auth.isLoggedIn()) {
            this.model[0].items?.push({ label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() });
            const indexLogin = this.model[0].items?.findIndex((o) => o.label == 'Login');
            const indexSignup = this.model[0].items?.findIndex((o) => o.label == 'Signup');
            if (indexLogin && indexLogin > -1) {
                this.model[0].items?.splice(indexLogin, 1);
            }

            if (indexSignup && indexSignup > -1) {
                this.model[0].items?.splice(indexSignup, 1);
            }
        } else {
            this.model[0].items?.push({ label: 'Login', icon: 'pi pi-fw pi-cog', routerLink: ['/login'] }, { label: 'Signup', icon: 'pi pi-fw pi-cog', routerLink: ['/sign-up'] });

            const indexLogout = this.model[0].items?.findIndex((o) => o.label == 'Logout');
            if (indexLogout && indexLogout > -1) {
                this.model[0].items?.splice(indexLogout, 1);
            }
        }
    }

    private logout(): void {
        this.auth.logout();
        this.carregarItensMenu();
        this.notify(NotificationType.SUCCESS, 'Usuário deslogado com sucesso.');
    }
}
