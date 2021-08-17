import {Component} from "@angular/core";
import {RoomModel} from "../models/room.model";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RoomsService} from "../services/rooms.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: "room-page",
  templateUrl: "room-page.component.html",
  styleUrls: ["room-page.component.css"]
})
export class RoomPageComponent {
  room: RoomModel | undefined;

  get isOwner() {
    return this.room?.owner.id === UsersService.authedUser?.id;
  }

  constructor(private activatedRoute: ActivatedRoute, private roomService: RoomsService) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const roomId = Number(params.get('roomId'));
      roomService.GetRoom(roomId).subscribe((room: RoomModel) => {
        this.room = room;
      });
    });
  }

}
