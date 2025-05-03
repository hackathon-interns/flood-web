import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MenuItem} from 'primeng/api';

import {AppMenuitem} from './app.menuitem.component';

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
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.carregarItensMenu();
    }

    carregarItensMenu(): void {
        this.model = [
            {
                label: '',
                items: [
                    {label: 'Map', icon: 'pi pi-fw pi-map-marker', routerLink: ['/map']},
                    {label: 'Devices', icon: 'pi pi-fw pi-cog', routerLink: ['/devices']},
                    {label: 'Login', icon: 'pi pi-fw pi-cog', routerLink: ['/login']},
                    {label: 'Signup', icon: 'pi pi-fw pi-cog', routerLink: ['/sign-up']},
                ]
            },
        ];
    }
}
