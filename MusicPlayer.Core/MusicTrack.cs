using MusicPlayer.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MusicPlayer
{
  public class MusicTrack
  {
    [Key]
    public string Id { get; set; }
    [Required, StringLength(128)]
    public string Title { get; set; }
    [Required]
    [DefaultValue("Unknown")]
    public string Album { get; set; }
    [DefaultValue("Unknown")]
    public string Artist { get; set; }
    [Required]
    public TimeSpan Duration { get; set; }
    public int Notation { get; set; }

    public int SampleRate { get; set; }
  }
}
