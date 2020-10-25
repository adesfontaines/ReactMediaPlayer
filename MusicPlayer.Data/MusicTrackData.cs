using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicPlayer.Core;

namespace MusicPlayer.Data
{
    public class MusicTrackData : IMusicTrackData
    {
        private readonly MusicPlayerDbContext db;

        public MusicTrackData(MusicPlayerDbContext db)
        {
            this.db = db;
        }

        public async Task<bool> Add(MusicTrack newTrack)
        {
            db.Add(newTrack);
            return await CommitAsync() == 1;
        }
        public async Task<bool> AddRange(IEnumerable<MusicTrack> newTracks)
        {
            foreach (var newTrack in newTracks)
            {
                db.Add(newTrack);
            }
            return await CommitAsync() == newTracks.Count();
        }

        public async Task<MusicTrack> GetByIdAsync(string id)
        {
            return await db.Tracks.FindAsync(id);
        }

        public int GetCountOfTracks()
        {
            return db.Tracks.Count();
        }

        public async Task<IEnumerable<MusicTrack>> GetByNameAsync(string name)
        {
            var result = await (from r in db.Tracks
                                where r.Title.StartsWith(name) || string.IsNullOrEmpty(name)
                                orderby r.Title
                                select r).ToListAsync();

            return result;
        }
        public async Task<IEnumerable<MusicTrack>> GetAllAsync()
        {
            var result = await (from r in db.Tracks
                                orderby r.CreatedDate descending
                                select r).ToListAsync();

            return result;
        }

        public MusicTrack Update(MusicTrack updatedRestaurant)
        {
            var entity = db.Tracks.Attach(updatedRestaurant);
            entity.State = EntityState.Modified;
            return updatedRestaurant;
        }

        public async Task<int> CommitAsync()
        {
            return await db.SaveChangesAsync();
        }

        public async Task<MusicTrack> Delete(string id)
        {
            MusicTrack track = await GetByIdAsync(id);
            if (track != null)
            {
                db.Tracks.Remove(track);
            }
            return track;
        }

        public async Task<IEnumerable<string>> GetAllFilePath()
        {
            var result = await(from r in db.Tracks
                               select r.FilePath).ToListAsync();

            return result;
        }
    }
}
