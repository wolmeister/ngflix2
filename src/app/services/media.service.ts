import { Injectable } from '@angular/core';

import { Media } from '../models/media';
import { User } from '../models/user';
import { MediaProgressService } from './media-progress.service';
import { UserService } from './user.service';
import { medias } from './__data__/medias';

export type MediaProgressCount = {
  value: Media;
  count: number;
};

export type MediasByCountry = {
  country: string;
  medias: MediaProgressCount[];
};

export type MediasByTag = {
  tag: string;
  medias: Media[];
};

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    private mediaProgressService: MediaProgressService,
    private userService: UserService
  ) {}

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

  getLastWatchedMedias(user: User): Media[] {
    const progresses = this.mediaProgressService
      .getMediaProgresses(user)
      .filter((mp) => !!mp.firstFinishedAt)
      .sort((a, b) => b.firstFinishedAt.getTime() - a.firstFinishedAt.getTime())
      .slice(0, 5);
    return progresses.map((mp) => this.getMedia(mp.mediaId));
  }

  getTopMediasByTags(): MediasByTag[] {
    const tagMediasMap: { [key: string]: Media[] } = {};
    const progresses = this.mediaProgressService.getMediaProgresses();
    progresses.forEach((mp) => {
      const media = this.getMedia(mp.mediaId);
      media.tags.forEach((tag) => {
        if (!tagMediasMap[tag]) {
          tagMediasMap[tag] = [];
        }
        tagMediasMap[tag].push(media);
      });
    });
    return Object.entries(tagMediasMap)
      .sort(([, mediasA], [, mediasB]) => mediasB.length - mediasA.length)
      .slice(0, 5)
      .map(([tag, tagMedias]) => {
        return { tag, medias: tagMedias };
      });
  }

  getTopMediasByCountries(): MediasByCountry[] {
    const countryMediasMap: { [key: string]: Media[] } = {};
    const mediaCountryCount: { [key: string]: number } = {};
    const progresses = this.mediaProgressService.getMediaProgresses();
    progresses.forEach((mp) => {
      const media = this.getMedia(mp.mediaId);
      const user = this.userService.getUser(mp.userId);
      if (!countryMediasMap[user.country]) {
        countryMediasMap[user.country] = [];
      }
      countryMediasMap[user.country].push(media);

      const mediaCountryCountKey = `${user.country}.${media.id}`;
      if (!mediaCountryCount[mediaCountryCountKey]) {
        mediaCountryCount[mediaCountryCountKey] = 0;
      }
      mediaCountryCount[mediaCountryCountKey] += 1;
    });
    return Object.entries(countryMediasMap)
      .sort(([, mediasA], [, mediasB]) => mediasB.length - mediasA.length)
      .slice(0, 5)
      .map(([country, countryMedias]) => {
        return {
          country,
          medias: countryMedias.map((m) => {
            const mediaCountryCountKey = `${country}.${m.id}`;
            return {
              value: m,
              count: mediaCountryCount[mediaCountryCountKey],
            };
          }),
        };
      });
  }
}
