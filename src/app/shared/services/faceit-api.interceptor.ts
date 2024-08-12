import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FaceITAPIInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf('open.faceit.com') > -1) {
      if (environment.FACEIT_API_KEY) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${environment.FACEIT_API_KEY}`,
          },
        });
        return next.handle(request);
      }
    }

    return next.handle(request);
  }
}
