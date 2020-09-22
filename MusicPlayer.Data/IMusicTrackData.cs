using MusicPlayer.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicPlayer.Data
{
  public interface IMusicTrackData
  {
    Task<IEnumerable<MusicTrack>> GetTracksByNameAsync(string searchQuery);
    MusicTrack GetById(int id);
    MusicTrack Update(MusicTrack updatedTrack);
    MusicTrack Add(MusicTrack newTrack);
    MusicTrack Delete(int id);
    int GetCountOfTracks();
    int Commit();
  }
}
