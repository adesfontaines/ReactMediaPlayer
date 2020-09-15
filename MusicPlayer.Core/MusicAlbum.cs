using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MusicPlayer.Core
{
  public class MusicAlbum
  {
    [Key]
    public Guid Id { get; set; }

    [Required, StringLength(128)]
    public string Name { get; set; }
  }
}
