import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { FormService } from "../../../services/form-services/form.service";
import { FriendsDataService } from "../../../services/manage-friends-service/friends-data.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { createFriendsAction } from "../../../state/friend.actions";
import { createFriends } from "../../../state/friends.reducer";
import { IFriends } from "../../../interfaces/IFriend";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-friends-form',
  templateUrl: './friends-form.component.html',
  styleUrls: ['./friends-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsFormComponent implements OnInit, OnDestroy {

  createFriendsSubscription!: Subscription;
  friendsForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private friendFormService: FormService,
              private friendDataService: FriendsDataService,
              private route: Router,
              private snackBar: MatSnackBar,
              private store: Store) {}


  ngOnInit(): void {
    this.prepareAddForm();
  }


  prepareAddForm(): void {
    this.friendsForm = this.formBuilder.group({
      friendArray: this.formBuilder?.array([this.friendFormService.createNewFriendInstance()])
    });
  }


  get friendFormGroupArray(): FormArray {
    return <FormArray>this.friendsForm?.get('friendArray');
  }


  createFormGroupInstances(): void {
    this.friendFormGroupArray?.push(this.friendFormService.createNewFriendInstance());
  }


  removeFormGroupInstance(index: number): void {
    if (this.friendFormGroupArray?.length !== 1) {
        this.friendFormGroupArray?.removeAt(index);
    }
  }


  submitForm(): void {
    if (this.friendsForm.dirty && this.friendsForm.valid) {
        const formValue: IFriends[] = this.friendsForm.value.friendArray;

        this.store.dispatch(createFriendsAction({ addedFriends: formValue }));

        this.createFriendsSubscription = this.store.select(createFriends).subscribe(() => {
          this.route.navigate(['/view-friends']);
        });
    } else {
      this.snackBar.open('Please check the required fields', 'Close', {
        duration: 4000,
        verticalPosition: 'top'
      })
    }
  }

  ngOnDestroy(): void {
    this.createFriendsSubscription?.unsubscribe();
  }

}
