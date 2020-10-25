import BaseMediaEntity from "./BaseMediaEntity";

export default interface MusicTrack extends BaseMediaEntity
{
  title: string;
  sorttitle: string;
  album: string;
  artist: string;
  duration: number;
  notation: number;
  samplerate: number;
  bitrate: number;
  channels: number;
  discnumber: number;
  tracknumber: number;
  filepath: string;
}