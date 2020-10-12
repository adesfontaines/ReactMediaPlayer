using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using MusicPlayer.Data;
using System.Threading.Tasks;
using System.IO;

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
        public async Task<IEnumerable<MusicTrack>> Get(string searchQuery = null)
        {
            try
            {
                return await trackData.GetTracksByNameAsync(searchQuery);
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve music tracks");
                throw;
            }
        }
        [HttpGet]
        [Route("stream/{trackId}")]
        public async Task<Stream> StreamTrack(string trackId)
        {
            try
            {
                string fileLocation = "C://Users//ADE//Downloads//Ben Prunty Music - FTL//09 Colonial (Explore).mp3";
                if (System.IO.File.Exists(fileLocation))
                {
                    Stream stream = System.IO.File.OpenRead(fileLocation);
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
    }
}