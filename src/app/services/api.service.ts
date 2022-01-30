import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { GenericApiResponse } from "../common/models";


@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private baseUrl: string = '/api/v1/';

	constructor(private http: HttpClient) {}

	post(slug: string, payload: any): Observable<GenericApiResponse> {
		return this.http.post<GenericApiResponse>(this.baseUrl + slug, payload).pipe(catchError(this.handleError));
	}

	get(slug: string): Observable<any> {
		return this.http.get(this.baseUrl + slug).pipe(catchError(this.handleError));
	}

	update(slug: string, payload: any): Observable<any> {
		return this.http.patch(this.baseUrl + slug, payload).pipe(catchError(this.handleError));
	}

	delete(slug: string): Observable<any> {
		return this.http.delete(this.baseUrl + slug).pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		if (error.status === 401) {
			console.error('Unauthorize');
		}

		return throwError(() => new Error(error.message));
	}
}