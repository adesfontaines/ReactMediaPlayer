using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using MusicPlayer.Data;
using System.Threading.Tasks;

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
      return await trackData.GetTracksByNameAsync(searchQuery);
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
  }
}
