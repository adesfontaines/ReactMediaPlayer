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
    [Route("api/media")]
    public class MediaController : ControllerBase
    {
        ILogger<MediaController> logger;
        IConfiguration configuration;

        public MediaController(ILogger<MediaController> logger, IConfiguration configuration)
        {
            this.logger = logger;
            this.configuration = configuration;
        }
    }
}