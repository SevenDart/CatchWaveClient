import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {RoomsService} from "../../../services/rooms.service";
import {Router} from "@angular/router";

@Component({
  selector: 'enter-game-tab',
  templateUrl: 'enter-game-tab.component.html',
  styleUrls: ['enter-game-tab.component.less']
})
export class EnterGameTabComponent {
  roomIdField = new FormControl('', [Validators.pattern('[0-9]+')]);

  @Output() closeRequest = new EventEmitter();

  constructor(private roomService: RoomsService, private router: Router) {
  }

  EnterGame() {
    this.roomService.EnterRoom(this.roomIdField.value).subscribe(() => {
      this.router.navigate(['/room/', this.roomIdField.value]);
    });
  }
}
