using MusicPlayer.Core;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace MusicPlayer.Data
{
    public interface IMusicTrackData
    {
        Task<IEnumerable<MusicTrack>> GetByNameAsync(string searchQuery);
        Task<IEnumerable<MusicTrack>> GetAllAsync();
        Task<MusicTrack> GetByIdAsync(string id);
        MusicTrack Update(MusicTrack updatedTrack);
        Task<bool> Add(MusicTrack newTrack);
        Task<bool> AddRange(IEnumerable<MusicTrack> newTracks);
        Task<MusicTrack> Delete(string id);
        int GetCountOfTracks();
        Task<int> CommitAsync();
        Task <IEnumerable<string>> GetAllFilePath();
    }
}
