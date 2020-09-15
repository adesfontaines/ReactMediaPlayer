using System.ComponentModel.DataAnnotations;

namespace MusicPlayer
{
  public class MusicTrack
  {
    [Key]
    public string Id { get; set; }
    [Required, StringLength(128)]
    public string Name { get; set; }
    public string Album { get; set; }
    public string Artist { get; set; }
    [Required]
    public int Duration { get; set; }
    public string DurationCaption => string.Format("{0}:{1:00}", Duration / 60, Duration % 60);
    public int Notation { get; set; }
  }
}
