import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Media } from '../../../../models/media';

@Component({
  selector: 'app-media-information',
  templateUrl: './media-information.component.html',
  styleUrls: ['./media-information.component.scss'],
})
export class MediaInformationComponent {
  @Input() item: Media;
  @Output() playItem = new EventEmitter<Media>();
  @Output() closeItem = new EventEmitter<Media>();

  handlePlay() {
    this.playItem.emit(this.item);
  }

  handleClose() {
    this.closeItem.emit(this.item);
  }
}
