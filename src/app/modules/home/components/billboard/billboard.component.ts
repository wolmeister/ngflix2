import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BillboardMedia } from '../../../../models/billboard-media';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss'],
})
export class BillboardComponent {
  @Input() billboard: BillboardMedia;
  @Output() playItem = new EventEmitter<BillboardMedia>();

  handlePlay() {
    this.playItem.emit(this.billboard);
  }
}
