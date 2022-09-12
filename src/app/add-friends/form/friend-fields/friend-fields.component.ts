import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ControlContainer, FormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";

@Component({
  selector: 'app-friend-fields',
  templateUrl: './friend-fields.component.html',
  styleUrls: ['./friend-fields.component.scss']
})
export class FriendFieldsComponent implements AfterViewInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ ENTER, SPACE, COMMA];
  friendContacts: String[] = [];
  @ViewChild('nameElement') nameElement!: ElementRef;


  constructor(public controlContainer: ControlContainer) {}


  get friendsFormGroupControl(): FormGroup {
    return this.controlContainer?.control as FormGroup;
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.friendContacts?.push(value);
    }

    this.controlContainer.value.friends = [this.friendContacts]
    event.chipInput!.clear();
  }


  remove(contact: String): void {
    const index = this.friendContacts?.indexOf(contact);

    if (index >= 0) {
      this.friendContacts?.splice(index, 1);
    }
  }


  ngAfterViewInit(): void {
    this.nameElement.nativeElement.focus();
  }
}
