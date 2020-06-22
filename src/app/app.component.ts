import { Component, OnInit } from '@angular/core';

import { MediaProgressService } from './services/media-progress.service';
import { UserService } from './services/user.service';
import { MediaService } from './services/media.service';
import { Media } from './models/media';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private mediaProgressService: MediaProgressService,
    private mediaService: MediaService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.injectFakeData();
  }

  injectFakeData() {
    // only inject fake data if it's the first time running the app
    if (this.mediaProgressService.getMediaProgresses().length) {
      return;
    }
    const medias = this.mediaService.getMedias();
    this.userService.getUsers().forEach((user) => {
      const mediaA = this.getRandomMedia(medias);
      let mediaB = this.getRandomMedia(medias);

      while (mediaA === mediaB) {
        mediaB = this.getRandomMedia(medias);
      }

      this.mediaProgressService.saveMediaProgress({
        mediaId: mediaA.id,
        userId: user.id,
        finished: true,
        progress: 0,
        firstFinishedAt: new Date(),
      });

      this.mediaProgressService.saveMediaProgress({
        mediaId: mediaB.id,
        userId: user.id,
        finished: true,
        progress: 0,
        firstFinishedAt: new Date(),
      });
    });
  }

  getRandomMedia(medias: Media[]) {
    const index = Math.floor(Math.random() * medias.length);
    return medias[index];
  }
}
