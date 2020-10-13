using System;
using System.ComponentModel.DataAnnotations;

namespace MusicPlayer.Core
{
  public class MusicArtist : MediaElement
  {
    [Required, StringLength(64)]
    public string Name { get; set; }

  }
}
