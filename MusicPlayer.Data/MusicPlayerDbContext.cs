using Microsoft.EntityFrameworkCore;
using MusicPlayer.Core;
using System;

namespace MusicPlayer.Data
{
  public class MusicPlayerDbContext : DbContext
  {
    public DbSet<MusicTrack> Tracks { get; set; }
    public DbSet<MusicAlbum> Albums { get; set; }
    public DbSet<MusicArtist> Artists { get; set; }
    public MusicPlayerDbContext(DbContextOptions<MusicPlayerDbContext> options)
    : base(options)
    {
    }
  }
}
