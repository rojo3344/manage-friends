import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendDetailsComponent } from "./friend-details/friend-details.component";
import { ViewFriendsComponent } from "./view-friends.component";
import { BarChartComponent } from "../common/bar-chart/bar-chart.component";
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { friendsReducer } from "../state/friends.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FriendsEffects } from "../state/friends.effects";


@NgModule({
  declarations: [
    FriendDetailsComponent,
    ViewFriendsComponent,
    BarChartComponent,

  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', component: ViewFriendsComponent },
    ]),
    StoreModule.forFeature('friends',  friendsReducer ),
    EffectsModule.forFeature([FriendsEffects])
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class ViewFriendsModule { }
