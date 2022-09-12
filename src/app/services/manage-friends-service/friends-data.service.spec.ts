import { TestBed } from '@angular/core/testing';

import { FriendsDataService } from './friends-data.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IFriends } from "../../interfaces/IFriend";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('FriendsDataService', () => {
  let service: FriendsDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(FriendsDataService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getFriends', () => {
    it('should return the correct data', () => {
      const expectedData: IFriends[] = [
        {  name: 'Jean', age: 45, weight: 245, friends: ['Masd', 'Tory'] },
        {  name: 'Rid', age: 55, weight: 265, friends: ['Test', 'Test2'] }
      ];

      httpClientSpy.get.and.returnValue(of(expectedData));

      service.getFriends().subscribe(
      (data: IFriends[]) => {
          expect(data).toEqual(expectedData);
        },
      );
    });


    it('handles failure',() => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(of(errorResponse));

      service.getFriends().subscribe(
        () => fail(),
        (error)  => {
          expect(error.status).toEqual(404);
        }
      );
    });
  });

  describe('addFriends', () => {
    it('handles add method (success)',() => {
      const expectedData: IFriends[] = [
        {  name: 'Jean', age: 45, weight: 245, friends: ['Masd', 'Tory'] },
        {  name: 'Rid', age: 55, weight: 265, friends: ['Test', 'Test2'] }
      ];

      httpClientSpy.post.and.returnValue(of(expectedData));

      service.addFriends(expectedData).subscribe(
        (data: IFriends[]) => {
          expect(data).toEqual(expectedData);
        },
      );
    });

    it('handles and empty array of friends (success)', () => {
      const expectedData: IFriends[] = [];

      httpClientSpy.post.and.returnValue(of(expectedData));

      service.addFriends(expectedData).subscribe(
        (data: IFriends[]) => {
          expect(data).toEqual(expectedData);
        },
      );
    });

    it('handles failed http )', () => {
      const expectedData: IFriends[] = [];

      httpClientSpy.post.and.returnValue(of(expectedData));

      service.addFriends(expectedData).subscribe(
        (data: IFriends[]) => {
          expect(data).toEqual(expectedData);
        },
      );
    });

  });
});
