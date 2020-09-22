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
    public string Title { get; set; }
    public string Artists { get; set; }
    public int Year { get; set; }
    public string CoverSource { get; set; }
  }
}
