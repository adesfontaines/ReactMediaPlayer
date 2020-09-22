using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicPlayer.Data
{
  public class MusicTrackData : IMusicTrackData
  {
    private readonly MusicPlayerDbContext db;

    public MusicTrackData(MusicPlayerDbContext db)
    {
      this.db = db;
    }

    public MusicTrack Add(MusicTrack newRestaurant)
    {
      db.Add(newRestaurant);
      return newRestaurant;
    }

    public int Commit()
    {
      return db.SaveChanges();
    }

    public MusicTrack Delete(int id)
    {
      MusicTrack track = GetById(id);
      if (track != null)
      {
        db.Tracks.Remove(track);
      }
      return track;
    }

    public MusicTrack GetById(int id)
    {
      return db.Tracks.Find(id);
    }

    public int GetCountOfTracks()
    {
      return db.Tracks.Count();
    }

    public async Task<IEnumerable<MusicTrack>> GetTracksByNameAsync(string name)
    {
      var result = await(from r in db.Tracks
                  where r.Title.StartsWith(name) || string.IsNullOrEmpty(name)
                  orderby r.Title
                  select r).ToListAsync();

      return result;
    }

    public MusicTrack Update(MusicTrack updatedRestaurant)
    {
      var entity = db.Tracks.Attach(updatedRestaurant);
      entity.State = EntityState.Modified;
      return updatedRestaurant;
    }
  }
}
