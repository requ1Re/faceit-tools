import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FaceITAPIInterceptor implements HttpInterceptor {
  private http: HttpClient;
  private FACEIT_API_KEY: string;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.http = this.injector.get(HttpClient);

      this.http.get<{ FACEIT_API_KEY: string }>('/assets/env.json').subscribe((env) => {
        this.FACEIT_API_KEY = env.FACEIT_API_KEY;
      });
    });
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.indexOf('open.faceit.com') > -1){
      console.log("found open.faceit.com request: adding token", this.FACEIT_API_KEY);

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.FACEIT_API_KEY}`
        }
      });
    }

    return next.handle(request);
  }
}
