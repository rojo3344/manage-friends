import { IFriends } from "./IFriend";

export interface IFriendState {
  showListDetail: boolean;
  friendsList: IFriends[];
  addedFriends: IFriends[];
  error?: string;
}

export interface IState {
  friends: IFriendState;
}
