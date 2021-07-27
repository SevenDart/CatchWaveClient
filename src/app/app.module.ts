import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";

import { AppComponent } from './app.component';
import {StartPageComponent} from "./start-page/start-page.component";
import {PlayModalWindowComponent} from "./start-page/play-modal-window/play-modal-window.component";
import {EnterGameTabComponent} from "./start-page/play-modal-window/enter-game-tab/enter-game-tab.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CreateGameTabComponent} from "./start-page/play-modal-window/create-game-tab/create-game-tab.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "./services/users.service";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Routes = [
  {path: 'start', component: StartPageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'start'}
];

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    PlayModalWindowComponent,
    EnterGameTabComponent,
    CreateGameTabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
