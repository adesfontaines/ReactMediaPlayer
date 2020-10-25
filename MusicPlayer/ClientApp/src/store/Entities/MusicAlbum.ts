import BaseMediaEntity from "./BaseMediaEntity";

export default interface MusicAlbum extends BaseMediaEntity {
  title: string;
  sorttitle: string;
  artists: string;
  year: number;
}