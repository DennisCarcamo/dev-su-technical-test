import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {
    // empty
  }

  public ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('HomeComponent initialized');
  }
}
