import { createAction, props } from "@ngrx/store";
import { IFriends } from "../interfaces/IFriend";

export const toggleFriendDetailAction = createAction('[Detail] toggle list detail');

export const loadFriendsListAction = createAction('[Friends] load friend list');

export const loadFriendsListSuccess = createAction('[Friends] load friend list success',
  props<{ friendsList: IFriends[]}>());

export const loadFriendsFailure  = createAction('[Friends] load Friends list Fail',
  props<{ error: string }>());

export const createFriendsAction = createAction('[Friends] create Friends',
  props<{ addedFriends: IFriends[] }>());

export const createFriendsSuccess = createAction('[Friends] create Friend success',
  props<{ friends: IFriends[] }>());

export const createFriendsFailure = createAction('[Friends] create Friend failure',
  props<{ error: string }>());

