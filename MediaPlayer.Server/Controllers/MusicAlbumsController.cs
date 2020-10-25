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
    [Route("api/albums")]
    public class MusicAlbumsController : ControllerBase
    {
        public IEnumerable<MusicAlbum> Albums { get; set; }
        private readonly MusicPlayerDbContext _context;
        private readonly IMusicAlbumData albumData;
        ILogger<MusicAlbumsController> logger;
        IConfiguration configuration;

        public IEnumerable<MusicAlbum> Tracks { get; set; }

        public MusicAlbumsController(ILogger<MusicAlbumsController> logger, IConfiguration configuration, IMusicAlbumData albumData)
        {
            this.logger = logger;
            this.configuration = configuration;
            this.albumData = albumData;
        }

        [HttpGet]
        [Route("get/{searchQuery?}")]
        public async Task<IEnumerable<MusicAlbum>> GetByName(string searchQuery = null)
        {
            try
            {
                return await albumData.GetAlbumsByNameAsync(searchQuery);
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve albums");
                throw;
            }
        }
        [HttpGet]
        [Route("id/{albumId}")]
        public MusicAlbum GetById(string albumId)
        {
            var musicAlbum = albumData.GetById(albumId);
            return musicAlbum;
        }
        private bool MusicAlbumExists(string id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }
        [HttpGet]
        [Route("cover/{albumId}")]
        public async Task<Stream> GetCover(string albumId)
        {
            try
            {
                string coverImagePath = configuration.GetSection("FoldersMapping")["AlbumsCover"] + albumId;
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
                logger.LogCritical(e, "Cannot retrieve music albums");
                throw;
            }
        }
    }
}
