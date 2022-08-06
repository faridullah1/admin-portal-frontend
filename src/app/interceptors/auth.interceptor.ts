import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent,  HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.authService.getToken();
		
		if (token) {
			request = request.clone({
				headers: request.headers.set('x-auth-token', token)
			});
		}

		return next.handle(request);
	}
}
