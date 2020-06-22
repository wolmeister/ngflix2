import { Injectable } from '@angular/core';

import { BillboardMedia } from '../models/billboard-media';
import { billboard } from './__data__/billboard';

@Injectable({
  providedIn: 'root',
})
export class BillboardService {
  getBillboard(): BillboardMedia {
    return billboard;
  }
}
