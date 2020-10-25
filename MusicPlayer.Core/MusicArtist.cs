using System;
using System.ComponentModel.DataAnnotations;

namespace MusicPlayer.Core
{
    public class MusicArtist : MediaElement
    {
        [Required, StringLength(64)]
        public string Name { get; set; }
        public string SortName { get; set; }
        public string Biography { get; set; }
        public string Country { get; set; }
    }
}
