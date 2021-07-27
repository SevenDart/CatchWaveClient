import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'create-game-tab',
  templateUrl: 'create-game-tab.component.html',
  styleUrls: ['create-game-tab.component.css']
})
export class CreateGameTabComponent {
  roomNameField = new FormControl('', [Validators.required, Validators.minLength(6)]);

  CreateGame() {

  }
}
