using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicPlayer.Core;

namespace MusicPlayer.Data
{
    public class MusicAlbumData : IMusicAlbumData
    {
        private readonly MusicPlayerDbContext db;

        public MusicAlbumData(MusicPlayerDbContext db)
        {
            this.db = db;
        }

        public MusicAlbum Add(MusicAlbum newAlbum)
        {
            db.Add(newAlbum);
            return newAlbum;
        }

        public int Commit()
        {
            return db.SaveChanges();
        }

        public MusicAlbum Delete(string id)
        {
            MusicAlbum album = GetById(id);
            if (album != null)
            {
                db.Albums.Remove(album);
            }
            return album;
        }

        public int GetCountOfAlbums()
        {
            return db.Albums.Count();
        }

        public async Task<IEnumerable<MusicAlbum>> GetAlbumsByNameAsync(string name)
        {
            var result = await (from r in db.Albums
                                where r.Title.StartsWith(name) || string.IsNullOrEmpty(name)
                                orderby r.Title
                                select r).ToListAsync();

            return result;
        }
        public MusicAlbum GetById(string id)
        {
            return db.Albums.Find(id);
        }

        public MusicAlbum Update(MusicAlbum updatedAlbum)
        {
            var entity = db.Albums.Attach(updatedAlbum);
            entity.State = EntityState.Modified;
            return updatedAlbum;
        }
    }
}
