import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalType } from '../../types/modal-types';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ModalComponent {
  @Input() public title: string = '';
  @Input() public subtitle: string = '';
  @Input() public isOpen: boolean = false;
  @Input() public type: ModalType = ''; // can be '', 'error', 'warning', 'success'

  @Output() public closed: EventEmitter<void> = new EventEmitter<void>();

  public onClose(): void {
    this.closed.emit();
  }

  public get headerClass(): string {
    return this.type ? `modal-header ${this.type}` : 'modal-header';
  }
}
