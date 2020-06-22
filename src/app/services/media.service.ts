import { Injectable } from '@angular/core';

import { Media } from '../models/media';
import { User } from '../models/user';
import { MediaProgressService } from './media-progress.service';
import { medias } from './__data__/medias';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private mediaProgressService: MediaProgressService) {}

  getMedia(id: number): Media {
    return medias.find((m) => m.id === id) || null;
  }

  getMedias(): Media[] {
    return [...medias];
  }

  getUnfinishedMedias(user: User): Media[] {
    const progresses = this.mediaProgressService
      .getMediaProgresses(user)
      .filter((mp) => !mp.finished);
    return progresses.map((mp) => this.getMedia(mp.mediaId));
  }
}
