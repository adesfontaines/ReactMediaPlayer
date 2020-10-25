using MusicPlayer.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicPlayer.Data
{
  public interface IMusicAlbumData
  {
    Task<IEnumerable<MusicAlbum>> GetAlbumsByNameAsync(string searchQuery);
    MusicAlbum GetById(string id);
    MusicAlbum Update(MusicAlbum updatedTrack);
    MusicAlbum Add(MusicAlbum newTrack);
    MusicAlbum Delete(string id);
    int GetCountOfAlbums();
    int Commit();
  }
}
