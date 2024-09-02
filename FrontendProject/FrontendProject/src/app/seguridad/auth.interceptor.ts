import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private usuarioService: UsuarioService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.usuarioService.getToken();
        console.log('Token interceptado:', token); // Añadir esto para depurar

        if (token) {
            const cloned = request.clone({
              headers: request.headers.set('Authorization', token)
            });
            console.log('Request con token:', cloned); // Añadir esto para depurar
            return next.handle(cloned).pipe(           //Metodot para redirigir al login una ves se temrine el tiempo del token -- solo si se realiza una solicitud
              catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                  // Token has expired or is not valid
                  this.usuarioService.logout();
                  this.router.navigate(['/login']);
                }
                return throwError(error);
              })
            );
          } else {
            return next.handle(request);
          }
    }
}
