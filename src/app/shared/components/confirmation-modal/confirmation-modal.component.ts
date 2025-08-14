import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalType } from '../../types/modal-types';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ConfirmationModalComponent {
  @Input() public productId: string = '';
  @Input() public title: string = '';
  @Input() public subtitle: string = '';
  @Input() public isOpen: boolean = false;
  @Input() public type: ModalType = '';

  @Output() public closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() public continue: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    //
  }

  public onClose(): void {
    this.closeModal.emit();
  }

  public onContinue(): void {
    this.continue.emit(this.productId);
  }

  public onCancel(): void {
    this.cancel.emit();
  }

  public get headerClass(): string {
    return this.type ? `modal-header ${this.type}` : 'modal-header';
  }
}
