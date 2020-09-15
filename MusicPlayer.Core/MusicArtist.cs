using System;
using System.ComponentModel.DataAnnotations;

namespace MusicPlayer.Core
{
  public class MusicArtist
  {
    [Key]
    public Guid Id { get; set; }
    [Required, StringLength(64)]
    public string Name { get; set; }

  }
}
