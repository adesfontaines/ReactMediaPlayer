using MusicPlayer.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicPlayer.Data
{
  public interface IMusicAlbumData
  {
    Task<IEnumerable<MusicAlbum>> GetAlbumsByNameAsync(string searchQuery);
    MusicAlbum GetById(int id);
    MusicAlbum Update(MusicAlbum updatedTrack);
    MusicAlbum Add(MusicAlbum newTrack);
    MusicAlbum Delete(int id);
    int GetCountOfAlbums();
    int Commit();
  }
}
