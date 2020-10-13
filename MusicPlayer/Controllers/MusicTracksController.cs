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

namespace MusicPlayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicTracksController : ControllerBase
    {
        private readonly IMusicTrackData trackData;
        ILogger<MusicTracksController> logger;
        public IEnumerable<MusicTrack> Tracks { get; set; }

        public MusicTracksController(ILogger<MusicTracksController> logger, IMusicTrackData trackData)
        {
            this.logger = logger;
            this.trackData = trackData;
        }
        [HttpGet]
        [Route("{searchQuery?}")]
        public async Task<IEnumerable<MusicTrack>> GetByName(string searchQuery = null)
        {
            try
            {
                return await trackData.GetByNameAsync(searchQuery);
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve music tracks");
                throw;
            }
        }
        [HttpGet]
        [Route("{trackId:int}")]
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
        [HttpPost("import")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ImportTracks(string[] files)
        {
            Console.WriteLine("importing tracks currently la maintenant...");
            string supportedExtensions = "*.wav,*.aac,*.wma,*.wmv,*.mp3";

            IEnumerable<string> filePaths = Directory.EnumerateFiles(@"C:\Users\ADE\Downloads\Ben Prunty Music - FTL", "*.*", SearchOption.AllDirectories)
      .Where(s => supportedExtensions.Contains(Path.GetExtension(s).ToLower()));
            
            IEnumerable<MusicTrack> tracks = await MusicWorkerService.Instance.GetTracksFromFiles(filePaths.ToArray());
            await trackData.AddRange(tracks);
            return Ok();
        }
    }
}