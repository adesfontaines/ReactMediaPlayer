﻿using MusicPlayer.Core;
using MusicPlayer.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlayer.MediaWorker
{
  public class MediaWorker
  {
    public MediaWorker()
    {

    }

    string supportedExtensions = "*.wav,*.aac,*.wma,*.wmv,*.mp3";

    public async Task<List<MusicAlbum>> GetAlbumsAsync()
    {
      HttpClient client = new HttpClient();
      client.BaseAddress = new Uri("http://localhost:5001/");

      HttpResponseMessage response = await client.GetAsync("api/musicalbums/");
      if (response.IsSuccessStatusCode)
      {
        var jsonString = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<List<MusicAlbum>>(jsonString);
      }

      return null;
    }
    /// <summary>
    /// ImportFromFolderAsync
    /// </summary>
    /// <param name="directory"></param>
    /// <returns></returns>
    public async Task<IEnumerable<MusicTrack>> ImportFromFolderAsync(string directory)
    {
      IEnumerable<string> filePaths = Directory.EnumerateFiles(directory, "*.*", SearchOption.AllDirectories)
            .Where(s => supportedExtensions.Contains(Path.GetExtension(s).ToLower()));

      if (!filePaths.Any())
        return null;

      List<MusicAlbum> albums = await GetAlbumsAsync();
      List<MusicTrack> result = new List<MusicTrack>();

      foreach (string file in filePaths)
      {
        TagLib.File tfile = TagLib.File.Create(file);

        string trackAlbumTitle = tfile.Tag.Album;
        int year = string.IsNullOrEmpty(tfile.Tag.Album) ? DefaultValues.DEFAULT_YEAR : int.Parse(tfile.Tag.Album);

        if (!string.IsNullOrEmpty(trackAlbumTitle) && !albums.Exists(x => x.Title == trackAlbumTitle))
        {
          AddAlbum(new MusicAlbum()
          {
            Artists = string.Join(",", tfile.Tag.AlbumArtistsSort),
            Title = trackAlbumTitle,
            Year = year,
            CoverSource = "https://via.placeholder.com/111"
          });
        }

        MusicTrack mt = new MusicTrack()
        {
          Title = tfile.Tag.Title,
          Artist = tfile.Tag.FirstAlbumArtist,
          Album = trackAlbumTitle,
          Duration = (int)tfile.Properties.Duration.TotalSeconds,
          SampleRate = tfile.Properties.AudioSampleRate,
        };

        result.Add(mt);
      }

      return result.AsEnumerable();
    }

    private void AddAlbum(MusicAlbum musicAlbum)
    {
      throw new NotImplementedException();
    }
  }
}
