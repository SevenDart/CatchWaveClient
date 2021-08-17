import {Component, Output, EventEmitter} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {RoomsService} from "../../../services/rooms.service";
import {RoomModel} from "../../../models/room.model";
import {Router} from "@angular/router";

@Component({
  selector: 'create-game-tab',
  templateUrl: 'create-game-tab.component.html',
  styleUrls: ['create-game-tab.component.less']
})
export class CreateGameTabComponent {
  roomNameField = new FormControl('', [Validators.required, Validators.minLength(6)]);

  @Output() closeRequest = new EventEmitter();

  constructor(private roomsService: RoomsService, private router: Router) {
  }

  CreateGame() {
    this.roomsService.CreateRoom(this.roomNameField.value).subscribe(
      (room: RoomModel) => {
        const id = room.id;
        this.closeRequest.emit();
        this.router.navigate(['/room/', id]);
    });
  }
}
