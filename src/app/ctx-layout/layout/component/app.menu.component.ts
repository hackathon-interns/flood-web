import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';

import { AppMenuitem } from './app.menuitem.component';
import { AuthService } from '../../../api/auth';
import { BaseAbstract } from '../../../libraries/abstracts';
import { LoadingService } from '../service/loading.service';
import { NotificationType } from '../../../libraries/enums';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, ButtonModule],
    template: `<ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
        @if (isLoggedIn) {
            <p-button [style]="{ width: '100%' }" label="Logout" icon="pi pi-sign-out" (onClick)="onClickLogout()" pRipple />
        } @else {
            <p-button class="auth-button" [style]="{ width: '45%' }" label="Signup" icon="pi pi-user-plus" (onClick)="onClickSignup()" pRipple />
            <p-button [style]="{ width: '45%' }" label="Login" icon="pi pi-sign-in" (onClick)="onClickLogin()" pRipple />
        } `
})
export class AppMenu extends BaseAbstract {
    model: MenuItem[] = [];

    get isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private router: Router,
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
    }

    protected onClickSignup(): void {
        this.router.navigateByUrl('/sign-up');
    }

    protected onClickLogin(): void {
        this.router.navigateByUrl('/login');
    }

    protected onClickLogout(): void {
        this.auth.logout();
        this.carregarItensMenu();
    }
}
