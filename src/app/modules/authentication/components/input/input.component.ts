import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() text: string;
  @Output() textChange = new EventEmitter<string>();
  @Input() placeholder: string;
  @Input() type = 'text';
}
