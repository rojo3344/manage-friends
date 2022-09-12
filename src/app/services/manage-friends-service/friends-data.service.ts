import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IFriends } from "../../interfaces/IFriend";
import { catchError, forkJoin, Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FriendsDataService {

  constructor(private http: HttpClient) { }


  getFriends(): Observable<IFriends[]> {
   return  this.http.get<IFriends[]>('api/friends');
  }


  addFriends(friends: IFriends[]): Observable<IFriends[]> {
    const friendsData:  Observable<IFriends>[] = friends?.map(value => this.http.post<IFriends>('api/friends', value));

    return forkJoin(friendsData).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

}
