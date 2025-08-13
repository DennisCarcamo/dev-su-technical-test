import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.css'],
})
export class ProductsListPageComponent implements OnInit {
  constructor() {
    // empty
  }

  public ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('Products List Page Initialized');
  }
}
