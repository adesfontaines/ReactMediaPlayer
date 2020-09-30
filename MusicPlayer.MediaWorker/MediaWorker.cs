using MusicPlayer.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace MusicPlayer.MediaWorker
{
  public class MediaWorker
  {
    public MediaWorker()
    {

    }

    string supportedExtensions = "*.wav,*.aac,*.wma,*.wmv,*.mp3";
    public IEnumerable<MusicTrack> ImportFromFolder(string directory)
    {
      List<MusicTrack> result = new List<MusicTrack>();
      IEnumerable<string> filePaths = Directory.EnumerateFiles(directory, "*.*", SearchOption.AllDirectories)
            .Where(s => supportedExtensions.Contains(Path.GetExtension(s).ToLower() ));

      foreach (string file in filePaths)
      {
        result.Add(ImportFromFile(file));
      }

      foreach(string album in result.Select(x=>x.Album)
      return null;
    }

    private MusicTrack ImportFromFile(string file)
    {
      TagLib.File tfile = TagLib.File.Create(file);

      string title = tfile.Tag.Title;
      string album = tfile.Tag.Album;
      string artist = tfile.Tag.FirstAlbumArtist;
      int sampleRate = tfile.Properties.AudioSampleRate;
      TimeSpan duration = tfile.Properties.Duration;
      Console.WriteLine("Title: {0}\n- duration: {1}\n- album: {2}\n- artist: {3}\n- sampleRate: {4}\n\n", title, duration, album, artist, sampleRate);

      return new MusicTrack()
      {
        Title = tfile.Tag.Title,
        Artist = tfile.Tag.FirstAlbumArtist,
        Duration = tfile.Properties.Duration,
        SampleRate = tfile.Properties.AudioSampleRate,
      };

    }
  }
}
