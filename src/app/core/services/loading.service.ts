import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public readonly isLoading: Signal<boolean> = computed(() => this._pendingRequests() > 0);

  private readonly _pendingRequests: WritableSignal<number> = signal(0);

  public increment(): void {
    this._pendingRequests.update((count) => count + 1);
  }

  public decrement(): void {
    this._pendingRequests.update((count) => Math.max(0, count - 1));
  }
}
