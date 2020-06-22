import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Media } from '../../../../models/media';

@Component({
  selector: 'app-browser-slider',
  templateUrl: './browser-slider.component.html',
  styleUrls: ['./browser-slider.component.scss'],
})
export class BrowserSliderComponent {
  @Input() caption: string;
  @Input() items: Media[];
  @Input() relativeCaption = false;
  @Output() playItem = new EventEmitter<Media>();

  activeItem: Media = null;

  handlePlay(item: Media) {
    this.playItem.emit(item);
  }

  handleInfo(item: Media) {
    this.activeItem = item;
  }

  handleClose() {
    this.activeItem = null;
  }
}
