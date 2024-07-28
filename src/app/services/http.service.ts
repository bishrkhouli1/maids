import { HttpClient } from '@angular/common/http';
import {
  DestroyRef,
  Injectable,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';

export class requestOptions {
  link = '';
  showloader?: boolean = true;
  opj?: any;
  des?: DestroyRef;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  server = 'https://reqres.in/api/';

  http = inject(HttpClient);
  loading = inject(LoadingService);
  destroyRef = inject(DestroyRef);

  constructor() {}

  attatchPipe<T>(stream: Observable<T>, op: requestOptions) {
    console.log('req');
    if (op.showloader) this.loading.increse();
    if (!op.des) op.des = this.destroyRef;

    op.des.onDestroy(() => {
      if (op.showloader) this.loading.decrice();
    });
    return stream.pipe(
      takeUntilDestroyed(op.des),
      tap(() => {
        if (op.showloader) {
          this.loading.decrice();
        }
      })
    );
  }

  get<T>(op: requestOptions) {
    const request = this.http.get<T>(this.server + op.link);
    return this.attatchPipe(request, op);
  }
  post<T>(op: requestOptions) {
    const request = this.http.post<T>(this.server + op.link, op.opj);
    return this.attatchPipe(request, op);
  }
  delete<T>(op: requestOptions) {
    const request = this.http.delete<T>(this.server + op.link);
    return this.attatchPipe(request, op);
  }
  put<T>(op: requestOptions) {
    const request = this.http.put<T>(this.server + op.link, op.opj);
    return this.attatchPipe(request, op);
  }
  patch<T>(op: requestOptions) {
    const request = this.http.patch<T>(this.server + op.link, op.opj);
    return this.attatchPipe(request, op);
  }
}
