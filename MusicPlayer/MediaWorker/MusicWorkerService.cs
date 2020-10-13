using MusicPlayer.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
                BaseAddress = new Uri("http://localhost:5001/")
            };

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
        /// <param name="files">files</param>
        /// <returns></returns>
        public async Task<IEnumerable<MusicTrack>> GetTracksFromFiles(string[] files)
        {
            if (!files.Any())
                return null;

            //List<MusicAlbum> albums = await GetAlbumsAsync();
            List<MusicTrack> result = new List<MusicTrack>();

            foreach (string file in files)
            {
                TagLib.File tfile = TagLib.File.Create(file);

                string trackAlbumTitle = tfile.Tag.Album;
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

                MusicTrack mt = new MusicTrack()
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = tfile.Tag.Title,
                    Artist = tfile.Tag.FirstAlbumArtist,
                    Album = trackAlbumTitle,
                    Duration = (int)tfile.Properties.Duration.TotalSeconds,
                    SampleRate = tfile.Properties.AudioSampleRate,
                    FilePath = file,
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
