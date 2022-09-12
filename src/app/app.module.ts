import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatTabsModule } from "@angular/material/tabs";
import { EffectsModule } from '@ngrx/effects';
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { FriendsData } from "./database/friends.data";
import { ViewFriendsModule } from './view-friends/view-friends.module';
import { AddFriendsModule } from './add-friends/add-friends.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(FriendsData),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ViewFriendsModule,
    AddFriendsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
