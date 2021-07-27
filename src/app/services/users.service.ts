import {Injectable} from "@angular/core";
import {UserModel} from "../models/user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  static authedUser: UserModel;
  static token: string;

  constructor(private http: HttpClient) {
  }

  ErrorHandlerFactory(messageSwitcher: (error: HttpErrorResponse) => string | null, snackBar: MatSnackBar) {
    return ((error: HttpErrorResponse) => {
      const message: string | null = messageSwitcher(error);
      if (message !== null) {
        const bar = snackBar.open(message, 'Close');
        bar._dismissAfter(3 * 1000);
        if (!environment.production) {
          return throwError(error);
        }
        return throwError(message);
      }
      else {
        const bar = snackBar.open('Server is down.', 'Close');
        bar._dismissAfter(3 * 1000);
        if (!environment.production) {
          return throwError(error);
        }
        return throwError('Server is down.');
      }
    });
  }

  Login(username: string, errorHandlerSnackBar: MatSnackBar) {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred.';
      }
      return null;
    };
    const errorHandler = this.ErrorHandlerFactory(messageSwitcher, errorHandlerSnackBar);

    const obs = this.http.put(environment.serverAddress + '/users/token', {username: username}).pipe(catchError(errorHandler));

    obs.subscribe(
      (data: any) => {
        UsersService.authedUser = data.authedUser;
        UsersService.token = data.token;
      });

    return obs;
  }
}
