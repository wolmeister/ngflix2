import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rating: number;

  getColor() {
    if (this.rating === 18) {
      return '#000000';
    }
    if (this.rating === 16) {
      return '#cd0510';
    }
    if (this.rating === 14) {
      return '#ee8712';
    }
    if (this.rating === 12) {
      return '#f7d01b';
    }
    if (this.rating === 10) {
      return '#5b90d4';
    }
    return '#439e29';
  }
}
