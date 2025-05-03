import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<string | null>(null);
  loading$ = this.loadingSubject.asObservable();

  start(message?: string): void {
    this.loadingSubject.next(message ?? 'Loading...');
  }

  stop(): void {
    this.loadingSubject.next(null);
  }
}
