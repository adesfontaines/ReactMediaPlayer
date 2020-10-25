using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MusicPlayer.Core;
using MusicPlayer.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MediaPlayer.Server.Controllers
{
    [ApiController]
    [Route("api/artists")]
    public class MusicArtistsController : ControllerBase
    {
        public IEnumerable<MusicArtist> Artists { get; set; }
        private readonly MusicPlayerDbContext _context;
        private readonly IMusicArtistData artistData;
        ILogger<MusicArtistsController> logger;
        IConfiguration configuration;

        public IEnumerable<MusicArtist> Tracks { get; set; }

        public MusicArtistsController(ILogger<MusicArtistsController> logger, IConfiguration configuration, IMusicArtistData artistData)
        {
            this.logger = logger;
            this.configuration = configuration;
            this.artistData = artistData;
        }

        [HttpGet]
        [Route("get/{searchQuery?}")]
        public async Task<IEnumerable<MusicArtist>> GetByName(string searchQuery = null)
        {
            try
            {
                return await artistData.GetArtistsByNameAsync(searchQuery);
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve artists");
                throw;
            }
        }
        [HttpGet]
        [Route("id/{artistId}")]
        public MusicArtist GetById(string artistId)
        {
            var musicArtist = artistData.GetById(artistId);
            return musicArtist;
        }
        private bool MusicArtistExists(string id)
        {
            return _context.Artists.Any(e => e.Id == id);
        }
        [HttpGet]
        [Route("cover/{artistId}")]
        public async Task<Stream> GetCover(string artistId)
        {
            try
            {
                string coverImagePath = configuration.GetSection("FoldersMapping")["ArtistsCover"] + artistId;
                if (System.IO.File.Exists(coverImagePath))
                {
                    Stream stream = System.IO.File.OpenRead(coverImagePath);
                    stream = await Task.FromResult(stream);
                    return stream;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve music artists");
                throw;
            }
        }
    }
}
