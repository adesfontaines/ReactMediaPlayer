export default class MediaUtils {
  static formatTimeLabel(given_seconds: number): string {

    given_seconds = Math.trunc(given_seconds);
    const hours = Math.floor(given_seconds / 3600);
    const minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    const seconds = given_seconds - (hours * 3600) - (minutes * 60);

    return minutes.toString().padStart(1, '0') + ':' +
      seconds.toString().padStart(2, '0');
  }
  static getMusicStreamURL(trackId: string): string {

    return "https://" + window.location.hostname + "/api/musictracks/stream/" + trackId;
  }
}
