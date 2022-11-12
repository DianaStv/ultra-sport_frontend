
import { ReplaySubject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: ``
})
export class Unsubscribe implements OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
