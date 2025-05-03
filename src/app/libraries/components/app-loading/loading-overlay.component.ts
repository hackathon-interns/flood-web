import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from '../../../ctx-layout/layout/service/loading.service';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  standalone: false,
})
export class LoadingOverlayComponent {
  loadingMessage$: Observable<string | null>;

  constructor(private loadingService: LoadingService) {
    this.loadingMessage$ = this.loadingService.loading$;
  }
}
