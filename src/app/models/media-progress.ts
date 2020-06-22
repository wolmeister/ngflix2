export interface MediaProgress {
  userId: number;
  mediaId: number;
  progress: number;
  finished: boolean; // if the user starts watching again, this will be set to false
  updatedAt?: Date;
  firstFinishedAt?: Date;
}
