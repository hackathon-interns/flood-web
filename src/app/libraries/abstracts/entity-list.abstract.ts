import {Component} from '@angular/core';

import {MessageService} from 'primeng/api';

import {LoadingService} from '../../ctx-layout/layout/service/loading.service';
import {BaseAbstract} from './base.abstract';
import { Table } from 'primeng/table';
import { NotificationType } from '../enums';

@Component({template: ''})
export abstract class EntityListAbstract extends BaseAbstract {
    searchValue: string = '';
    adicionarVisible: boolean = false;
    editarVisible: boolean = false;
    excluirVisible: boolean = false;

    constructor(
        messageService: MessageService,
        loadingService: LoadingService) {
        super(messageService, loadingService);
    }

    onClickClear(table: Table): void {
        this.notify(NotificationType.SUCCESS, undefined, 'Filtros removidos com sucesso.');
        table.clear();
        this.searchValue = '';
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}