import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpHeaderResponse, HttpProgressEvent, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Client-Side Error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('Server-Side Error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          if(error.error.errors){
            errorMsg = `${error.error.errors[0].message} (${error.error.errors[0].code})`;
          }
        }
        console.log(errorMsg);

        this.errorService.displayError(errorMsg);

        return throwError(() => errorMsg);
      })
    );
  }
}
