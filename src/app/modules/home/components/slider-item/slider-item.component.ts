import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Media } from '../../../../models/media';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
})
export class SliderItemComponent {
  @Input() item: Media;
  @Input() hover: boolean;
  @Output() playclick = new EventEmitter<Media>();
  @Output() infoclick = new EventEmitter<Media>();

  handlePlayClick() {
    this.playclick.emit(this.item);
  }

  handleInfoClick() {
    this.infoclick.emit(this.item);
  }
}
