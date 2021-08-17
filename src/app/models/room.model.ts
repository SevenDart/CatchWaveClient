import {UserModel} from "./user.model";

export interface RoomModel {
  id: number;
  name: string;
  owner: UserModel;
  users: UserModel[];
}
