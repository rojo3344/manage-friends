import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FriendsDataService } from "../services/manage-friends-service/friends-data.service";
import {
  createFriendsAction,
  createFriendsFailure,
  createFriendsSuccess,
  loadFriendsListAction,
  loadFriendsListSuccess
} from "./friend.actions";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";


@Injectable()

export class FriendsEffects {


  constructor(private actions: Actions, private friendsDataService: FriendsDataService) {}


  loadFriends = createEffect(() => {
    return this.actions.pipe(
      ofType(loadFriendsListAction),
      mergeMap(() => {
        return this.friendsDataService.getFriends().pipe(
          map(friendsList => loadFriendsListSuccess({ friendsList }))
        );
      })
    );
  });

  createFriends = createEffect(() => {
    return this.actions
      .pipe(
        ofType(createFriendsAction),
        concatMap(action => this.friendsDataService.addFriends(action.addedFriends)
            .pipe(
              map(addedFriends => createFriendsSuccess({ friends: addedFriends })),
              catchError(error => of(createFriendsFailure({ error })))
            )
        )
      );
  });
}
