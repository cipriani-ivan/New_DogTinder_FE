import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (localStorage.getItem('token') != null) {
        const userToken = localStorage.getItem('token');
        const modifiedReq = req.clone({ 
          headers: req.headers.set('Authorization', `Bearer ${userToken}`),     
        });
        return next.handle(modifiedReq).pipe(
          tap(
            succ => {},
            err => {
              if (err.status === 401) {
                this.router.navigateByUrl('/login');
              } else if ((err.status = 403)) {
                alert(err.localStorage.getItem('userToken'));
              }
            }
          ))
      } else {
          this.router.navigateByUrl('/login');
          return next.handle(req.clone());
      }
    }
  }