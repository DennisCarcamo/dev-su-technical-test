import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;

  beforeEach(() => {
    component = new ModalComponent();
  });

  it('should emit closed when onClose is called', () => {
    const emitSpy: jest.SpyInstance = jest.spyOn(component.closed, 'emit');
    component.onClose();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should return correct headerClass when type is set', () => {
    component.type = 'error';
    expect(component.headerClass).toBe('modal-header error');
  });

  it('should return default headerClass when type is empty', () => {
    component.type = '';
    expect(component.headerClass).toBe('modal-header');
  });
});
