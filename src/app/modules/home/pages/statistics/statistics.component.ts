import { Component, OnInit } from '@angular/core';

import {
  MediaService,
  MediasByCountry,
  MediasByTag,
} from '../../../../services/media.service';
import { UserService } from '../../../../services/user.service';
import { MediaProgressService } from '../../../../services/media-progress.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  topWatchedByTags: MediasByTag[] = [];
  topWatchedByCountries: MediasByCountry[] = [];
  usersWhoMostWatched: User[] = [];
  userWatchCount: { [key: number]: number } = {};
  country: string;

  constructor(
    private mediaService: MediaService,
    private userService: UserService,
    private mediaProgressService: MediaProgressService
  ) {}

  ngOnInit() {
    this.topWatchedByTags = this.mediaService.getTopMediasByTags();
    this.topWatchedByCountries = this.mediaService.getTopMediasByCountries();
    this.usersWhoMostWatched = this.userService.getUsersWhoWatchedTheMost();

    this.usersWhoMostWatched.forEach((user) => {
      const count = this.mediaProgressService.getMediaProgresses(user).length;
      this.userWatchCount[user.id] = count;
    });

    if (this.topWatchedByCountries.length) {
      this.country = this.topWatchedByCountries[0].country;
    }
  }

  getMediasByCountry(country: string) {
    const mediaByCountry = this.topWatchedByCountries.find(
      (mc) => mc.country === country
    );
    if (mediaByCountry) {
      return mediaByCountry.medias;
    }
    return [];
  }
}
