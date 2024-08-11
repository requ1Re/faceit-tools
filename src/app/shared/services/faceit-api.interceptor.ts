import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  Injectable,
  Injector,
  makeStateKey,
  TransferState,
} from '@angular/core';
import { Observable } from 'rxjs';

const dataKey = makeStateKey<{ FACEIT_API_KEY: string }>('env');

@Injectable()
export class FaceITAPIInterceptor implements HttpInterceptor {
  private http: HttpClient;
  envData?: { FACEIT_API_KEY: string };

  constructor(
    private injector: Injector,
    private transferState: TransferState
  ) {
    this.envData = this.transferState.get<{ FACEIT_API_KEY: string }>(
      dataKey,
      { FACEIT_API_KEY: 'err' }
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.http = this.injector.get(HttpClient);

    if (request.url.indexOf('open.faceit.com') > -1) {
      if (this.envData?.FACEIT_API_KEY) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.envData.FACEIT_API_KEY}`,
          },
        });
        return next.handle(request);
      }
    }

    return next.handle(request);
  }
}
