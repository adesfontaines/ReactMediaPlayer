using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using System.Text;

namespace MusicPlayer.Core
{
  public sealed class MusicAlbum : MediaElement
    {
    [Required, StringLength(128)]
    public string Title { get; set; }
    public string SortableTitle { get; set; }
    public string Artists { get; set; }
    public int Year { get; set; }
  }
}
