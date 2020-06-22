import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Media } from '../../../../models/media';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnChanges {
  @Input() items: Media[] = [];
  @Output() playItem = new EventEmitter<Media>();
  @Output() infoItem = new EventEmitter<Media>();

  translateX = 0;
  hoverIndex = -1;

  ngOnChanges() {
    this.translateX = 0;
  }

  handlePlayClick(item: Media) {
    this.playItem.emit(item);
  }

  handleInfoClick(item: Media) {
    this.infoItem.emit(item);
  }

  hasPrevious() {
    return this.translateX < 0;
  }

  hasNext() {
    return this.items.length > Math.abs(this.translateX / 20) + 5;
  }

  handlePrevious() {
    this.translateX += 100;
  }

  handleNext() {
    this.translateX -= 100;
  }

  handleMouseEnter(slideIndex: number) {
    this.hoverIndex = slideIndex;
  }

  handleMouseLeave() {
    this.hoverIndex = -1;
  }

  getSlideTranform(slideIndex: number) {
    if (this.hoverIndex === -1) {
      return '';
    }
    const firstItemHover = this.hoverIndex % 5 === 0;
    const lastItemHover = (this.hoverIndex + 1) % 5 === 0;
    if (slideIndex === this.hoverIndex) {
      if (firstItemHover) {
        return 'scale(1.95) translateX(23.75%)';
      }
      if (lastItemHover) {
        return 'scale(1.95) translateX(-23.75%)';
      }
      return 'scale(1.95)';
    }
    // before hover
    if (slideIndex < this.hoverIndex) {
      if (lastItemHover) {
        return 'translateX(-95%)';
      }
      if (firstItemHover) {
        return 'translateX(0)';
      }
      return 'translateX(-47.5%)';
    }
    // after hover
    if (slideIndex > this.hoverIndex) {
      if (firstItemHover) {
        return 'translateX(95%)';
      }
      if (lastItemHover) {
        return 'translateX(0)';
      }
      return 'translateX(47.5%)';
    }
    return '';
  }
}
