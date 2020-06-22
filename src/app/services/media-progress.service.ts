import { Injectable } from '@angular/core';

import { MediaProgress } from '../models/media-progress';
import { User } from '../models/user';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root',
})
export class MediaProgressService {
  private key = '@@ngflix2/progresses';

  getMediaProgresses(user?: User): MediaProgress[] {
    const currentsString = localStorage.getItem(this.key);
    let currents: MediaProgress[] = [];
    if (currentsString) {
      currents = JSON.parse(currentsString);
    }
    if (user) {
      currents = currents.filter((mp) => mp.userId === user.id);
    }
    return currents;
  }

  getMediaProgress(user: User, media: Media): MediaProgress {
    const items = this.getMediaProgresses(user);
    return items.find((mp) => mp.mediaId === media.id) || null;
  }

  saveMediaProgress(mediaProgress: MediaProgress) {
    let currents = this.getMediaProgresses();
    currents = currents.filter(
      (mp) =>
        !(
          mediaProgress.userId === mp.userId &&
          mp.mediaId === mediaProgress.mediaId
        )
    );
    currents.push(mediaProgress);
    localStorage.setItem(this.key, JSON.stringify(currents));
  }
}
