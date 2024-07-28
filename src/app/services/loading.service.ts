import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private state = signal<number>(0);
  spinner = computed(() => {
    return this.state() != 0;
  });

  constructor() {}

  increse() {
    this.state.update(() => {
      return this.state() + 1;
    });
  }
  decrice() {
    this.state.update(() => {
      return this.state() > 0 ? this.state() - 1 : 0;
    });
  }
}
