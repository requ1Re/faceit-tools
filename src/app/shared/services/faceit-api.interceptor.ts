import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { map, Observable, switchMap, tap } from "rxjs";

@Injectable()
export class FaceITAPIInterceptor implements HttpInterceptor {
  private http: HttpClient;
  private FACEIT_API_KEY: string;

  constructor(private injector: Injector) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.http = this.injector.get(HttpClient);

    if(request.url.indexOf('open.faceit.com') > -1){
      if(this.FACEIT_API_KEY){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.FACEIT_API_KEY}`
          }
        });
        return next.handle(request);
      }else{
        return this.http.get<{ FACEIT_API_KEY: string }>('/assets/env.json').pipe(
          tap(env => this.FACEIT_API_KEY = env.FACEIT_API_KEY),
          map(env => request.clone({
            setHeaders: {
              Authorization: `Bearer ${env.FACEIT_API_KEY}`
            }
          })),
          switchMap(req => next.handle(req))
        );
      }
    }

    return next.handle(request);
  }
}
