import BaseMediaEntity from "./BaseMediaEntity";

export default interface MusicArtist extends BaseMediaEntity
{
    name: string;
    sortname: string;
    bibliography: string;
    country: string;
}