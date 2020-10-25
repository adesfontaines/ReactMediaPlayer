using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace MediaPlayer.Server.Controllers
{
    [ApiController]
    [Route("api/settings")]
    public class ServerConfigController : ControllerBase
    {
        IConfiguration configuration;


        public ServerConfigController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        [HttpGet]
        public JsonResult GetFeatures()
        {
            return new JsonResult(configuration.GetSection("Features").GetChildren());
        }
    }
}
