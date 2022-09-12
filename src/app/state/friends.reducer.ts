import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { IFriendState } from "../interfaces/IFriendState";
import {
  createFriendsAction,
  createFriendsFailure,
  createFriendsSuccess, loadFriendsFailure, loadFriendsListAction,
  loadFriendsListSuccess,
  toggleFriendDetailAction
} from "./friend.actions";


export const friendsReducer = createReducer<IFriendState>(
  { showListDetail: false, friendsList: [], addedFriends: [], error: '' },
  on(toggleFriendDetailAction, (state: IFriendState): IFriendState => {
    return {
      ...state,
      showListDetail: !state.showListDetail
    };
  }),
  on(loadFriendsListAction, (state): IFriendState => {
    return {
      ...state,
    }
  }),
  on(loadFriendsListSuccess, (state, action): IFriendState => {
    return {
      ...state,
      friendsList: action.friendsList
    }
  }),
  on(loadFriendsFailure, (action, state): IFriendState => {
    return {
      ...state,
      addedFriends: [],
      showListDetail: false,
      friendsList: [],
      error: action.error
    }
  })
);


export const createFriendsReducer = createReducer<IFriendState>(
  { showListDetail: false, friendsList: [], addedFriends: [] },
  on(createFriendsAction, (state, action): IFriendState => {
    return {
      ...state,
      addedFriends: action.addedFriends
    }
  }),

  on(createFriendsSuccess, (state, action): IFriendState => {
    return {
      ...state,
      addedFriends : action.friends
    }
  }),

  on(createFriendsFailure, (state, action): IFriendState => {
    return {
      ...state,
      error: action.error
    }
  })
)

const getFriendState = createFeatureSelector<IFriendState>('friends');
const getCreateFriendsState = createFeatureSelector<IFriendState>('addedFriends');

export const getShowDetailState = createSelector(getFriendState, state => state.showListDetail);
export  const getFriends = createSelector(getFriendState, state => state.friendsList);
export const createFriends = createSelector(getCreateFriendsState, state => state.addedFriends )



