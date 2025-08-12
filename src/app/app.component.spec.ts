import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', () => {
    const app: AppComponent = new AppComponent();
    expect(app).toBeTruthy();
  });

  it('should have as title \'dev-su-technical-test\'', () => {
    const app: AppComponent = new AppComponent();
    expect(app.title).toBe('dev-su-technical-test');
  });
});
