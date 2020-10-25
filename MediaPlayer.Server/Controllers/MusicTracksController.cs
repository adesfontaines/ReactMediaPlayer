using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using MusicPlayer.Data;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using MusicPlayer.MediaWorker;
using MusicPlayer.Core;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace MediaPlayer.Server.Controllers
{
    [ApiController]
    [Route("api/tracks")]
    public class MusicTracksController : ControllerBase
    {
        private readonly IMusicTrackData trackData;
        private readonly IMusicAlbumData albumData;
        private readonly IMusicArtistData artistData;
        ILogger<MusicTracksController> logger;
        IConfiguration configuration;
        public IEnumerable<MusicTrack> Tracks { get; set; }
        public MusicTracksController(ILogger<MusicTracksController> logger, IConfiguration configuration, IMusicTrackData trackData, IMusicAlbumData albumData, IMusicArtistData artistData)
        {
            this.logger = logger;
            this.configuration = configuration;
            this.trackData = trackData;
            this.albumData = albumData;
            this.artistData = artistData;
        }
        [HttpGet]
        [Route("count")]
        public int Count(string searchQuery = null)
        {
            return trackData.GetCountOfTracks();
        }
        [HttpGet]
        [Route("get/{searchQuery?}")]
        public async Task<IEnumerable<MusicTrack>> GetByName(string searchQuery = null)
        {
            try
            {
                if(string.IsNullOrEmpty(searchQuery)) {
                    return await trackData.GetAllAsync();
                }
                else {
                    return await trackData.GetByNameAsync(searchQuery);
                }
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve music tracks");
                throw;
            }
        }
        [HttpGet]
        [Route("id/{trackId}")]
        public async Task<MusicTrack> GetById(string trackId)
        {
            try
            {
                return await trackData.GetByIdAsync(trackId);
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve music track with id '", trackId, "'.");
                throw;
            }
        }
        [HttpGet]
        [Route("stream/{trackId}")]
        public async Task<Stream> StreamTrack(string trackId)
        {
            try
            {
                MusicTrack mt = await trackData.GetByIdAsync(trackId);
                if (mt != null && !string.IsNullOrEmpty(mt.FilePath) && System.IO.File.Exists(mt.FilePath))
                {
                    Stream stream = System.IO.File.OpenRead(mt.FilePath);
                    stream = await Task.FromResult(stream);
                    return stream;
                }

                Console.WriteLine("No track with id ", trackId, " was found");
                return null;
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve music tracks");
                throw;
            }
        }
        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Add(MusicTrack[] tracks)
        {
            await trackData.AddRange(tracks);
            return Ok();
        }
        [HttpPost("import")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ImportTracks(string[] files)
        {
            Console.WriteLine("importing tracks...");
            string supportedExtensions = "*.wav,*.aac,*.wma,*.wmv,*.mp3";
            string musicLibraryPath = configuration.GetSection("FoldersMapping")["MusicLibrary"];

            IEnumerable<string> filePaths = Directory.EnumerateFiles(musicLibraryPath, "*.*", SearchOption.AllDirectories)
      .Where(s => supportedExtensions.Contains(Path.GetExtension(s).ToLower()));

            var nonExistingTracks = filePaths.Except(await trackData.GetAllFilePath());

            var musicTracks = MusicWorkerService.Instance.GetTracksFromFiles(nonExistingTracks);
            if(musicTracks != null)
            {
                await Add(musicTracks.ToArray());
                
                // Create albums
                var albumsName = (await albumData.GetAlbumsByNameAsync(string.Empty)).Select(x=>x.Title);
                var addedAlbumsName = new List<string>();
                var tracks = musicTracks.Where(x => !albumsName.Contains(x.Album)).GroupBy(x => x.Album);

                foreach (IGrouping<string, MusicTrack> mtg in tracks)
                {
                    albumData.Add(new MusicAlbum { Title = mtg.Key, Artists = mtg.ElementAt(0).Artist, SortableTitle = mtg.Key });
                }

                // Create artists
                var artistsName = (await artistData.GetArtistsByNameAsync(string.Empty)).Select(x => x.Name);
                tracks = musicTracks.Where(x => !artistsName.Contains(x.Artist)).GroupBy(x=>x.Artist);

                foreach (IGrouping<string, MusicTrack> mtg in tracks)
                {
                    artistData.Add(new MusicArtist { Name = mtg.Key, SortName = mtg.Key });
                }

            }
            return Ok();
        }
    }
}