import { Observable, of } from "rxjs";
import { FriendsEffects } from "./friends.effects";
import { Store } from "@ngrx/store";
import { FriendsDataService } from "../services/manage-friends-service/friends-data.service";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { HttpClientModule } from "@angular/common/http";
import { createFriendsSuccess, loadFriendsListSuccess } from "./friend.actions";
import { IFriendState } from "../interfaces/IFriendState";

describe("Effects", () => {
  let actions$: Observable<any>
  let effects: FriendsEffects
  let store: Store
  let friendsDataService: FriendsDataService

  const friends = [
    { id: 1, name: "Henry", age: 40, weight: 245, friends: ["Jean", "Joseph", "Cling"]},
    { id: 2, name: "Brad", age: 42, weight: 235, friends: ["Jeff", "Johnny", "Lavel"]},
    { id: 3, name: "Sha", age: 36, weight: 135, friends: ["Riv", "Corina", "Lee"]},
    { id: 4, name: "Esther", age: 46, weight: 155, friends: ["Ryan", "Rust ", "Junior", "Corina", "Lee"]},
    { id: 5, name: "Tania", age: 34, weight: 135, friends: ["Jeff", "Jean", "Luis", "Fred"]},
  ];

  const sampleNewFriends =[ { id: 12, name: "Ricardo", age: 30, weight: 205, friends: ["Viny", "Lino", "Lopez", "Will", "Mark"]} ];

  beforeEach(() => {
    let initialState: IFriendState = { showListDetail: false, friendsList: [], addedFriends: [], error: '' };
    TestBed.configureTestingModule({
      providers: [
        FriendsEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
      ],
      imports: [HttpClientModule]
    })
    friendsDataService = TestBed.inject(FriendsDataService)
    effects = TestBed.inject(FriendsEffects)
    store = TestBed.inject(Store)
  })

  describe('getFriends action',  () => {
    it("should call getFriends", () => {
      spyOn(friendsDataService, "getFriends").and.returnValue(of(friends))
      actions$ = of(loadFriendsListSuccess);
      effects.loadFriends.subscribe(res => {
        expect(friendsDataService.getFriends).toHaveBeenCalled();
        expect(res).toEqual(loadFriendsListSuccess({friendsList: friends}));
      });
    })
  });

  describe('save friends action', () => {
    it("should call createFriends", () => {
      spyOn(friendsDataService, "addFriends").and.returnValue(of(sampleNewFriends));
      actions$ = of(createFriendsSuccess({ friends: sampleNewFriends }))
      effects.createFriends.subscribe(res => {
        expect(friendsDataService.addFriends).toHaveBeenCalled()
        expect(res).toEqual(createFriendsSuccess({ friends: sampleNewFriends }))
      })
    })
  });
})
