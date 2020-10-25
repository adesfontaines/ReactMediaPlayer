using MediaPlayer.Server;
using Microsoft.AspNetCore.Mvc;
using MusicPlayer.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MusicPlayer.MediaWorker
{
    public class MusicWorkerService : IMediaWorker
    {
        private static MusicWorkerService _instance;

        public static MusicWorkerService Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new MusicWorkerService();

                return _instance;
            }
        }
        public async Task<List<MusicAlbum>> GetAlbumsAsync()
        {
            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri(AppHttpContext.AppBaseUrl)
            };

            // Albums
            HttpResponseMessage response = await client.GetAsync("api/albums/");
            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<MusicAlbum>>(jsonString);
            }
            // Artists
            response = await client.GetAsync("api/artists/");
            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<MusicAlbum>>(jsonString);
            }
            return null;
        }
        public async Task ScanMusicMedia()
        {
            //int year = string.IsNullOrEmpty(tfile.Tag.Album) ? DefaultValues.DEFAULT_YEAR : int.Parse(tfile.Tag.Album);

            //if (!string.IsNullOrEmpty(trackAlbumTitle) && !albums.Exists(x => x.Title == trackAlbumTitle))
            //{
            //    AddAlbum(new MusicAlbum()
            //    {
            //        Artists = string.Join(",", tfile.Tag.AlbumArtistsSort),
            //        Title = trackAlbumTitle,
            //        Year = year,
            //        CoverSource = "https://via.placeholder.com/111"
            //    });
            //}

        }
        /// <summary>
        /// ImportFromFolderAsync
        /// </summary>
        /// <param name="files">files</param>
        /// <returns></returns>
        public IEnumerable<MusicTrack> GetTracksFromFiles(IEnumerable<string> files)
        {
            List<MusicTrack> result = new List<MusicTrack>();
            if (!files.Any())
                return null;

            foreach (string file in files)
            {
                TagLib.File tfile = TagLib.File.Create(file);

                string trackAlbumTitle = tfile.Tag.Album;
                if(tfile.PossiblyCorrupt)
                {
                    Console.WriteLine("Can't import file " + file + " possible file corruption.");
                    continue;
                }

                string albumName = string.IsNullOrEmpty(trackAlbumTitle) ? (Path.GetDirectoryName(file) != "Music" ? Path.GetDirectoryName(file) : "Unknown") : trackAlbumTitle;

                MusicTrack mt = new MusicTrack()
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = string.IsNullOrEmpty(tfile.Tag.Title) ? file : tfile.Tag.Title,
                    Artist = string.IsNullOrEmpty(tfile.Tag.FirstAlbumArtist) ? "Unknown" : tfile.Tag.FirstAlbumArtist,
                    Album = albumName,
                    Duration = (int)tfile.Properties.Duration.TotalSeconds,
                    SampleRate = tfile.Properties.AudioSampleRate,
                    Bitrate = tfile.Properties.AudioBitrate,
                    Channels = tfile.Properties.AudioChannels,
                    TrackNumber = tfile.Tag.Track,
                    DiscNumber = tfile.Tag.Disc,
                    FilePath = file,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                };

                result.Add(mt);
            }

            return result.AsEnumerable();
        }

        private void AddAlbum(MusicAlbum musicAlbum)
        {
            return;
        }
    }
}
