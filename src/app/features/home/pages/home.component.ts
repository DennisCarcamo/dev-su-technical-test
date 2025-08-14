import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /* istanbul ignore next */
  public images: string[] = [
    'assets/images/carousel-1.jpg',
    'assets/images/carousel-2.jpg',
    'assets/images/carousel-3.jpg',
  ];

  /* istanbul ignore next */
  public currentIndex: number = 0;

  public ngOnInit(): void {
    /* istanbul ignore next */
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  public prevSlide(): void {
    /* istanbul ignore next */
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  public nextSlide(): void {
    /* istanbul ignore next */
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }
}
