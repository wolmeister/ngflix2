import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app-store.state';
import { BillboardService } from '../../../../services/billboard.service';
import { MediaService } from '../../../../services/media.service';
import { BillboardMedia } from '../../../../models/billboard-media';
import { Media } from '../../../../models/media';
import { getUrl } from '../../../../utils/route.utils';
import { RoutesConfig } from '../../../../configs/routes.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  billboard: BillboardMedia;
  watchingMedias: Media[] = [];
  trendingMedias: Media[] = [];
  watchAgainMedias: Media[] = [];
  popularMedias: Media[] = [];
  newMedias: Media[] = [];
  transparent = true;

  constructor(
    private store: Store<AppState>,
    private billboardService: BillboardService,
    private mediaService: MediaService,
    private router: Router
  ) {}

  ngOnInit() {
    const medias = this.mediaService.getMedias();
    // random sort medias
    this.trendingMedias = medias;
    this.watchAgainMedias = [...medias].reverse();
    this.popularMedias = [...medias].sort((a, b) =>
      a.duration.localeCompare(b.duration)
    );
    this.newMedias = [...this.popularMedias].reverse();

    this.billboard = this.billboardService.getBillboard();
    this.store
      .select((state) => state.auth.user)
      .subscribe((user) => {
        this.watchingMedias = this.mediaService.getUnfinishedMedias(user);
      });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.transparent = window.scrollY < 70;
  }

  handlePlay(mediaId: number) {
    const url = getUrl(String(mediaId), RoutesConfig.watch.basePath);
    this.router.navigateByUrl(url);
  }
}
