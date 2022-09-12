import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IFriends } from "../interfaces/IFriend";
import { select, Store } from "@ngrx/store";
import { IState } from "../interfaces/IFriendState";
import { getFriends, getShowDetailState } from "../state/friends.reducer";
import { loadFriendsListAction, toggleFriendDetailAction } from "../state/friend.actions";
import { from, Observable } from "rxjs";

@Component({
  selector: 'app-view-friends',
  templateUrl: './view-friends.component.html',
  styleUrls: ['./view-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ViewFriendsComponent implements OnInit {
  showFriendDetail = false;
  friends: Observable<IFriends[]> = from([]);

  constructor(public store: Store<IState>) {}


  ngOnInit(): void {
    this.store?.pipe(select(getShowDetailState),
      )?.subscribe((details: boolean) => {
      this.showFriendDetail = details;
    });

    this.store.dispatch(loadFriendsListAction());
    this.friends = this.store?.pipe(select(getFriends));
  }


  showDetails(): void {
    this.store?.dispatch(toggleFriendDetailAction());
  }

}

