import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
// import { productModel } from './productmodel.component';
// import { GlobalErrorHandler } from '../globalerrorhandler';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServcieService {
  private employeeUrl =
    'https://employee-harness-ff-production.up.railway.app/employees';
  // 'https://employee-production-81b8.up.railway.app/employees';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private httpClient: HttpClient // private errorHandler: GlobalErrorHandler
  ) {}

  getEmployeeData(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(this.employeeUrl, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'A client side error occurs. The error message is ' + error.message
      );
    } else {
      console.error(
        'An error happened in server. The HTTP status code is ' +
          error.status +
          ' and the error returned is ' +
          error.message
      );
    }

    return throwError('Error occurred. Pleas try again');
  }
}
