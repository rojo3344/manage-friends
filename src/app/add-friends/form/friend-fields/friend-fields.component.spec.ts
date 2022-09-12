import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendFieldsComponent } from './friend-fields.component';
import { ControlContainer, FormBuilder } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('FriendFieldsComponent', () => {
  let component: FriendFieldsComponent;
  let fixture: ComponentFixture<FriendFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendFieldsComponent ],
      imports: [
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule ],
      providers: [ ControlContainer, FormBuilder  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('removes the element', () => {
      component.friendContacts = ['test1', 'test2', 'test3', 'test4', 'test5'];
      component.remove('test5');

      expect(component.friendContacts).toEqual(['test1', 'test2', 'test3', 'test4'])
  });


  it('checks for []', () => {
    component.friendContacts = [];
    component.remove('test5');

    expect(component.friendContacts).toEqual([])
  });

});
