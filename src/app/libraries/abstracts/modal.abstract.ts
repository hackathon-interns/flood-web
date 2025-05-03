import {FormBuilder} from '@angular/forms';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MessageService} from 'primeng/api';

import {ReactiveFormAbstract} from './reactive-form.abstract';
import {LoadingService} from '../../ctx-layout/layout/service/loading.service';

@Component({template: ''})
export abstract class ModalBaseAbstract extends ReactiveFormAbstract {
    @Input() visible: boolean = false;
    @Output() visibleEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<any>();
    @Output() cancelationEvent = new EventEmitter();

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder) {
        super(messageService, loadingService, formBuilder,);
    }

    notifySuccess(resultado: any): void {
        this.onHide();
        this.successEvent.emit(resultado);
    }

    notifyCancelation(resultado?: any): void {
        this.onHide();
        this.cancelationEvent.emit(resultado);
    }

    onHide(): void {
        this.visible = false;
        this.visibleEvent.emit(this.visible);
    }
}