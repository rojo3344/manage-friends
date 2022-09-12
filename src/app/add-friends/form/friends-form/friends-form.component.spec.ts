import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsFormComponent } from './friends-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router, RouterModule } from "@angular/router";
import { FriendsDataService } from "../../../services/manage-friends-service/friends-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormService } from "../../../services/form-services/form.service";
import { MatDialogModule } from "@angular/material/dialog";
import { provideMockStore } from "@ngrx/store/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";

describe('FriendsFormComponent', () => {
  let component: FriendsFormComponent;
  let fixture: ComponentFixture<FriendsFormComponent>;
  let formBuilder: FormBuilder;
  let createFormService: FormService;
  let store: Store;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule,
        MatDialogModule,
        MatCardModule,
        MatCardModule,
        MatIconModule
      ],
      providers: [
        FormBuilder,
        FriendsDataService,
        MatSnackBar,
        FormService,
        provideMockStore({}),
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsFormComponent);
    formBuilder = TestBed.get(FormBuilder);
    createFormService = TestBed.get(FormService);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    snackBar = TestBed.get(MatSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeFormGroupInstance', () => {
      it('removes the requested element', () => {

       component.friendsForm = formBuilder.group(
          {
            friendArray: formBuilder.array( [
                          { name: "Jed", age: 25, weight: 250, friends: [] },
                          { name: "Ted", age: 52, weight: 200, friends: ['Greg', 'toy'] },
                          { name: "Ria", age: 42, weight: 220, friends: ['Charles', 'Ricot'] }
            ])
          }
        );


        component.removeFormGroupInstance(2);
        const formVal = component.friendsForm.get('friendArray')?.value
        expect(component.friendFormGroupArray?.length).toEqual(2)
        expect(formVal).toEqual(
          [
            { name: "Jed", age: 25, weight: 250, friends: [] },
            { name: "Ted", age: 52, weight: 200, friends: ['Greg', 'toy'] },
          ]
        )
      });


    it('does not remove the provided index case of only 1 item in the array ', () => {

      component.friendsForm = formBuilder.group(
        {
          friendArray: formBuilder.array( [
            { name: "Jed", age: 25, weight: 250, friends: [] },
          ])
        }
      );

      component.removeFormGroupInstance(1);
      const formVal = component.friendsForm.get('friendArray')?.value
      expect(component.friendFormGroupArray?.length).toEqual(1)
      expect(formVal).toEqual(
        [
          { name: "Jed", age: 25, weight: 250, friends: [] },
        ]
      );
    });
  });
});
