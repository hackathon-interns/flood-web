import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: 'app-notification.component.html',
    standalone: false
})

export class AppNotificationComponent {
    @Input() position: any = "bottom-center";

    constructor() { }
}