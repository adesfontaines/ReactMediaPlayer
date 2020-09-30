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
  }
}
