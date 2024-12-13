// loader.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingCounter = signal<number>(0);
  private defaultMessage = 'Chargement...';
  private message = signal<string>(this.defaultMessage);
  isLoading$ = computed(() => this.loadingCounter() > 0);

  show(message?: string): void {
    this.loadingCounter.update((count) => count + 1);
    if (message) {
      this.message.set(message);
    }
  }

  hide(): void {
    this.loadingCounter.update((count) => Math.max(0, count - 1));
    if (this.loadingCounter() === 0) {
      this.message.set(this.defaultMessage);
    }
  }

  reset(): void {
    this.loadingCounter.set(0);
    this.message.set(this.defaultMessage);
  }
}
