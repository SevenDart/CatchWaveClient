import {Injectable} from "@angular/core";
import {UserModel} from "../models/user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {ServiceTools} from "./serviceTools";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private static _authedUser: UserModel;

  static get authedUser(): UserModel {
    let token = this.token;
    if (token !== null && !this._authedUser) {
      let decoded : any = jwtDecode(token);
      this._authedUser = {
        id: Number(decoded.Id),
        username: decoded.Username
      };
    }
    return this._authedUser;
  }


  static set authedUser(authedUser: UserModel) {
    this._authedUser = authedUser;
  }

  static get token() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  Login(username: string) {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred.';
      }
      return null;
    };

    const errorHandler = ServiceTools.ErrorHandlerFactory(messageSwitcher, this.snackBar);

    return this.http.put(environment.serverAddress + '/users/token', {username: username}).pipe(catchError(errorHandler));
  }
}
