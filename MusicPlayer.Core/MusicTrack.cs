using MediaPlayer.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MusicPlayer.Core
{
  public class MusicTrack : PlayableMedia
  {
    [Required, StringLength(128)]
    public string Title { get; set; }
    [Required]
    [DefaultValue("Unknown")]
    public string Album { get; set; }
    [DefaultValue("Unknown")]
    public string Artist { get; set; }
    [Required]
    public int Duration { get; set; }
    [Required]
    public string FilePath { get; set; }
    public int Notation { get; set; }

    public int SampleRate { get; set; }

    public int Bitrate { get; set; }
    public int Channels { get; set; }
    public uint DiscNumber { get; set; }
    public uint TrackNumber { get; set; }
    public override string Source { get => FilePath; }
    }
}
