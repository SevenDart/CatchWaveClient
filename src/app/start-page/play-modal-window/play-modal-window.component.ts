import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "play-modal-window",
  templateUrl: "play-modal-window.component.html",
  styleUrls: ["play-modal-window.component.less"]
})
export class PlayModalWindowComponent {

  constructor(private matDialogRef: MatDialogRef<PlayModalWindowComponent>) {
  }


  closeWindow() {
    this.matDialogRef.close();
  }

}
