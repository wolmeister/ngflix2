export interface Media {
  id: number;
  title: string;
  art: string; // url
  titleArt: string; // url
  file: string; // url
  synopsis: string;
  rating: number;
  duration: string;
  tags: string[];
}
