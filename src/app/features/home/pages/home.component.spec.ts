import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    component = new HomeComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
