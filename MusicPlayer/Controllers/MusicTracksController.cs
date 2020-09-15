using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MusicPlayer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicTracksController : ControllerBase
    {
        ILogger<MusicTracksController> logger;
        public MusicTracksController(ILogger<MusicTracksController> logger)
        {
          this.logger = logger;
        }
        [HttpGet]
        public IEnumerable<MusicTrack> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new MusicTrack
            {
                Name = "Track " + index,
                Artist = "Unknown",
                Album = "Unknown",
                Duration = 93,
                Notation = 0
            })
            .ToArray();
        }
        //[HttpGet("{trackId")]
        //public IEnumerable<MusicTrack> GetByTrackId(int trackId)
        //{
        //  var rng = new Random();
        //  return Enumerable.Range(1, 1).Select(index => new MusicTrack
        //    {
        //      Name = "Track " + index,
        //      Artist = "Unknown",
        //      Album = "Unknown",
        //      DurationSeconds = 93,
        //      Notation = 0
        //    })
        //    .ToArray();
        //}
        //[HttpGet("{albumId}")]
        //public IEnumerable<MusicTrack> GetByAlbumId(int albumId)
        //{
        //  var rng = new Random();
        //  return Enumerable.Range(1, 25).Select(index => new MusicTrack
        //    {
        //      Name = "Track " + index,
        //      Artist = "Unknown",
        //      Album = "Unknown",
        //      DurationSeconds = 93,
        //      Notation = 0
        //    })
        //    .ToArray();
        //}
  }
}
