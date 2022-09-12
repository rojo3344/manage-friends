import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ViewFriendsComponent } from './view-friends.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { BarChartComponent } from "../common/bar-chart/bar-chart.component";
import { IFriendState } from "../interfaces/IFriendState";
import { getFriends, getShowDetailState } from "../state/friends.reducer";
import { MemoizedSelector } from "@ngrx/store";
import { IFriends } from "../interfaces/IFriend";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";



describe('ViewFriendsComponent', () => {
  let component: ViewFriendsComponent;
  let fixture: ComponentFixture<ViewFriendsComponent>;
  let mockStore: MockStore<IFriendState>;
  let showDetailMockSelector: MemoizedSelector<IFriendState, boolean>
  let friendsListMockSelector: MemoizedSelector<IFriendState, IFriends[]>
  const initialState: IFriendState = {
    addedFriends: [],
    showListDetail: false,
    friendsList: [],
    error: ''
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFriendsComponent, BarChartComponent ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: getShowDetailState,
              value: initialState.showListDetail
            },
            {
              selector: getFriends,
              value: []
            }
          ]
        }),
      ],
      imports: [
        MatCardModule,
        MatChipsModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatIconModule
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ViewFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should dispatch the showDetail action',  fakeAsync(()=> {
    const testStore = spyOn(mockStore,  'dispatch').and.callThrough();
    component.showDetails();
    expect(testStore).toHaveBeenCalledTimes(1);

  }));


  it('should change the value of showFriendDetail to true', () => {
      showDetailMockSelector = mockStore.overrideSelector(getShowDetailState, true);
      mockStore.refreshState();
      fixture.detectChanges()

    expect(component.showFriendDetail).toEqual(true)
  });

});
