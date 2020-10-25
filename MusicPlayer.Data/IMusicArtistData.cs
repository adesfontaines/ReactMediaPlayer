using MusicPlayer.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicPlayer.Data
{
    public interface IMusicArtistData
    {
        Task<IEnumerable<MusicArtist>> GetArtistsByNameAsync(string searchQuery);
        MusicArtist GetById(string id);
        MusicArtist Update(MusicArtist updatedTrack);
        MusicArtist Add(MusicArtist newTrack);
        MusicArtist Delete(int id);
        int GetCountOfArtists();
        int Commit();
    }
}