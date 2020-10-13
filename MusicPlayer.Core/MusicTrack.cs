using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MusicPlayer.Core
{
  public class MusicTrack : MediaElement
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
    public int Notation { get; set; }

    public int SampleRate { get; set; }
    [Required]
    public string FilePath { get; set; }
  }
}
