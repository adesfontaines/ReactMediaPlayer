using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicPlayer.Core;

namespace MusicPlayer.Data
{
    public class MusicArtistData : IMusicArtistData
    {
        private readonly MusicPlayerDbContext db;

        public MusicArtistData(MusicPlayerDbContext db)
        {
            this.db = db;
        }

        public MusicArtist Add(MusicArtist newArtist)
        {
            db.Add(newArtist);
            return newArtist;
        }

        public int Commit()
        {
            return db.SaveChanges();
        }

        public MusicArtist Delete(int id)
        {
            MusicArtist album = GetById(id);
            if (album != null)
            {
                db.Artists.Remove(album);
            }
            return album;
        }

        public MusicArtist GetById(int id)
        {
            return db.Artists.Find(id);
        }

        public int GetCountOfArtists()
        {
            return db.Artists.Count();
        }

        public async Task<IEnumerable<MusicArtist>> GetArtistsByNameAsync(string name)
        {
            var result = await (from r in db.Artists
                                where r.Name.StartsWith(name) || string.IsNullOrEmpty(name)
                                orderby r.Name
                                select r).ToListAsync();

            return result;
        }
        public MusicArtist GetById(string id)
        {
            return db.Artists.Find(id);
        }

        public MusicArtist Update(MusicArtist updatedArtist)
        {
            var entity = db.Artists.Attach(updatedArtist);
            entity.State = EntityState.Modified;
            return updatedArtist;
        }
    }
}
