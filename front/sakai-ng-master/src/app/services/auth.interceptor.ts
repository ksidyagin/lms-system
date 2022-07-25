import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {User} from "../api/User";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (User.getAccessToken()) {
      request = this.addToken(request, User.getAccessToken());
    }

    return next.handle(request)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('/login')) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }


  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Handle 401 error
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.getNewTokens().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
