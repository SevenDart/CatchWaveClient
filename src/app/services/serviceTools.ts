import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";
import {throwError} from "rxjs";

export class ServiceTools {
  static ErrorHandlerFactory(messageSwitcher: (error: HttpErrorResponse) => string | null, snackBar: MatSnackBar) {
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
}
