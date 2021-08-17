import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PlayModalWindowComponent} from "./play-modal-window/play-modal-window.component";
import {UsersService} from "../services/users.service";

@Component({
  selector: "start-page",
  templateUrl: "start-page.component.html",
  styleUrls: ["start-page.component.css"]
})
export class StartPageComponent {
  usernameField = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private dialog: MatDialog, private usersService: UsersService) {
  }

  ChooseGame() {
    this.usersService.Login(this.usernameField.value).subscribe((data: any) => {
      UsersService.authedUser = data.user;
      localStorage.setItem('token', data.token);
      this.dialog.open(PlayModalWindowComponent, {
        width: '50%'
      });
    });
  }
}
