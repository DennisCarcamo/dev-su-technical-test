import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with images and index 0', () => {
    expect(component.images).toEqual([
      'assets/images/carousel-1.jpg',
      'assets/images/carousel-2.jpg',
      'assets/images/carousel-3.jpg',
    ]);
    expect(component.currentIndex).toBe(0);
  });

  it('should go to the next slide', () => {
    component.nextSlide();
    expect(component.currentIndex).toBe(1);

    component.currentIndex = component.images.length - 1;
    component.nextSlide();
    expect(component.currentIndex).toBe(0);
  });

  it('should go to the previous slide', () => {
    component.prevSlide();
    expect(component.currentIndex).toBe(component.images.length - 1);

    component.prevSlide();
    expect(component.currentIndex).toBe(component.images.length - 2);
  });

  it('should change slide automatically every 5 seconds', fakeAsync(() => {
    jest.useFakeTimers();
    component.ngOnInit();
    expect(component.currentIndex).toBe(0);

    tick(5000);
    expect(component.currentIndex).toBe(1);

    tick(5000);
    expect(component.currentIndex).toBe(2);

    tick(5000);
    expect(component.currentIndex).toBe(0);
  }));
});
