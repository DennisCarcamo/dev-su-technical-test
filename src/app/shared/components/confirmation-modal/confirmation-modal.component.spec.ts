import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;

  beforeEach(() => {
    component = new ConfirmationModalComponent();
  });

  it('should emit closeModal when onClose is called', () => {
    const emitSpy: jest.SpyInstance = jest.spyOn(component.closeModal, 'emit');
    component.onClose();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit continue with productId when onContinue is called', () => {
    const emitSpy: jest.SpyInstance = jest.spyOn(component.continue, 'emit');
    component.productId = 'abc123';
    component.onContinue();
    expect(emitSpy).toHaveBeenCalledWith('abc123');
  });

  it('should emit cancel when onCancel is called', () => {
    const emitSpy: jest.SpyInstance = jest.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should return correct headerClass when type is set', () => {
    component.type = 'warning';
    expect(component.headerClass).toBe('modal-header warning');
  });

  it('should return default headerClass when type is empty', () => {
    component.type = '';
    expect(component.headerClass).toBe('modal-header');
  });
});
