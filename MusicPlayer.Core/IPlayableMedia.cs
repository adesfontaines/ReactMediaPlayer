using MusicPlayer.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MediaPlayer.Core
{
    public abstract class PlayableMedia : MediaElement
    {
        [NotMapped]
        public abstract string Source { get; }
    }
}
