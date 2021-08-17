import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ServiceTools} from "./serviceTools";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";
import {UsersService} from "./users.service";
import {catchError} from "rxjs/operators";
import {RoomModel} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private httpClient: HttpClient, private errorHandlerSnackBar: MatSnackBar) {
  }

  CreateRoom(roomName: string) {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred.';
        case 401:
          return 'Authentication required.';
      }
      return null;
    };
    const errorHandler = ServiceTools.ErrorHandlerFactory(messageSwitcher, this.errorHandlerSnackBar);

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + UsersService.token
      })
    };

    return this.httpClient.post<RoomModel>(environment.serverAddress + '/rooms', {name: roomName}, options).pipe(catchError(errorHandler));
  }

  EnterRoom(roomId: number) {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 500:
          return 'Server error occurred.';
        case 401:
          return 'Authentication required.';
      }
      return null;
    };
    const errorHandler = ServiceTools.ErrorHandlerFactory(messageSwitcher, this.errorHandlerSnackBar);

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + UsersService.token
      })
    };

    return this.httpClient.put(environment.serverAddress + `/rooms/${roomId}`, null, options).pipe(catchError(errorHandler));
  }

  GetRoom(roomId: number) {
    const messageSwitcher = (error: HttpErrorResponse) => {
      switch (error.status) {
        case 404:
          return 'Room not found';
      }
      return null;
    };
    const errorHandler = ServiceTools.ErrorHandlerFactory(messageSwitcher, this.errorHandlerSnackBar);

    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + UsersService.token
      })
    };

    return this.httpClient.get<RoomModel>(environment.serverAddress + `/rooms/${roomId}`, options).pipe(catchError(errorHandler));
  }
}
