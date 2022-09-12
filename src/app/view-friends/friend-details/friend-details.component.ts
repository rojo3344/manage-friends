import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IFriends } from "../../interfaces/IFriend";

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendDetailsComponent {
  @Input() friendDetail!: IFriends;
}
