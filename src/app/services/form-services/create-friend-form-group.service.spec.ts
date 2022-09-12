import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('CreateFriendFormGroupService', () => {
  let service: FormService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [FormBuilder]
    });
    service = TestBed.inject(FormService);
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Form', () => {
    it('creates the form', () => {
      const fakeForm: FormGroup = service.createNewFriendInstance();

      expect(fakeForm.controls['name'].value).toEqual('');
      expect(fakeForm.controls['friends'].value).toEqual([]);
      expect(fakeForm.controls['age'].value).toEqual(0);
      expect(fakeForm.controls['weight'].value).toEqual(0);
    });
  })

  describe('  validateNumber', () => {
    it('returns null for valid number', () => {
      const control: FormControl = new FormControl<number>(34);
      expect(service.validateNumber(control)).toEqual(null);

    });

    it('returns null for valid number', () => {
      const control: FormControl = new FormControl<number>(34);
      expect(service.validateNumber(control)).toEqual(null);

    });

    it('returns { NaN: true } for invalid number', () => {
      const control: FormControl = new FormControl('ddddd');
      expect(service.validateNumber(control)).toEqual({ NaN: true });

    });
  })
});
