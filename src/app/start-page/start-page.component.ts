import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PlayModalWindowComponent} from "./play-modal-window/play-modal-window.component";
import {UsersService} from "../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "start-page",
  templateUrl: "start-page.component.html",
  styleUrls: ["start-page.component.css"]
})
export class StartPageComponent {
  usernameField = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private dialog: MatDialog, private usersService: UsersService, private snackBar: MatSnackBar) {
  }

  ChooseGame() {
    this.usersService.Login(this.usernameField.value, this.snackBar).subscribe(() => {
      this.dialog.open(PlayModalWindowComponent, {
        width: '50%'
      });
    });
  }
}
