import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FriendFieldsComponent } from "./form/friend-fields/friend-fields.component";
import { FriendsFormComponent } from "./form/friends-form/friends-form.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { StoreModule } from "@ngrx/store";
import { createFriendsReducer } from "../state/friends.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FriendsEffects } from "../state/friends.effects";




@NgModule({
  declarations: [
    FriendFieldsComponent,
    FriendsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature('addedFriends',  createFriendsReducer ),
    EffectsModule.forFeature([FriendsEffects])
  ]
})
export class AddFriendsModule { }
