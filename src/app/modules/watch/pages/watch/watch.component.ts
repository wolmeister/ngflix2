import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { AppState } from '../../../../store/app-store.state';
import { MediaProgressService } from '../../../../services/media-progress.service';
import { MediaService } from '../../../../services/media.service';
import { Media } from '../../../../models/media';
import { User } from '../../../../models/user';
import { getUrl } from '../../../../utils/route.utils';
import { RoutesConfig } from '../../../../configs/routes.config';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {
  plyrOptions = {
    controls: [
      'play-large',
      'play',
      'rewind',
      'fast-forward',
      'volume',
      'progress',
      'current-time',
      'fullscreen',
    ],
  };
  plyrSources = [];
  player: Plyr;
  user: User;
  media: Media;
  showBackIcon = false;
  loaded = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService,
    private mediaProgressService: MediaProgressService
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.auth.user)
      .subscribe((user) => {
        this.user = user;
      });
    this.route.paramMap.subscribe((paramMap) => {
      const mediaId = parseInt(paramMap.get('id'), 10);
      const media = this.mediaService.getMedia(mediaId);
      if (!media) {
        const url = getUrl(RoutesConfig.home.home, RoutesConfig.home.basePath);
        this.router.navigateByUrl(url);
        return;
      }
      this.media = media;
      this.plyrSources = [
        {
          src: media.file,
          type: 'video/mp4',
        },
      ];
    });
  }

  loadedData() {
    const mp = this.mediaProgressService.getMediaProgress(
      this.user,
      this.media
    );
    this.player.currentTime = mp && !mp.finished ? mp.progress : 0;
    this.loaded = true;
    this.player.play();
  }

  controlsShown() {
    this.showBackIcon = true;
  }

  controlsHidden() {
    this.showBackIcon = false;
  }

  timeUpdate() {
    if (!this.loaded) {
      return;
    }
    const { currentTime } = this.player;
    let mp = this.mediaProgressService.getMediaProgress(this.user, this.media);
    if (mp) {
      mp.finished = false;
      mp.progress = currentTime;
    } else {
      mp = {
        userId: this.user.id,
        mediaId: this.media.id,
        finished: false,
        progress: currentTime,
      };
    }
    this.mediaProgressService.saveMediaProgress(mp);
  }

  ended() {
    const mp = this.mediaProgressService.getMediaProgress(
      this.user,
      this.media
    );
    // will never be null
    if (mp) {
      mp.finished = true;
      this.mediaProgressService.saveMediaProgress(mp);
    }
  }
}
