import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'manage-friends';
  linksData = [
    { text: 'Add', path: '/add-friends' },
    { text: 'View', path: '/view-friends' }
  ];
}
