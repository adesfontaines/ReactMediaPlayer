using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MusicPlayer.Controllers;
using MusicPlayer.Core;
using MusicPlayer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.ClientApp.src.components.Album
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicAlbumsController : Controller
    {
        public IEnumerable<MusicAlbum> Albums { get; set; }
        private readonly MusicPlayerDbContext _context;
        private readonly IMusicAlbumData albumData;
        ILogger<MusicAlbumsController> logger;
        public IEnumerable<MusicAlbum> Tracks { get; set; }

        public MusicAlbumsController(ILogger<MusicAlbumsController> logger, IMusicAlbumData albumData)
        {
            this.logger = logger;
            this.albumData = albumData;
        }

        [HttpGet]
        [Route("get/{searchQuery?}")]
        public async Task<IEnumerable<MusicAlbum>> Get(string searchQuery = null)
        {
            try
            {
                return await albumData.GetAlbumsByNameAsync(searchQuery);
            }
            catch (Exception e)
            {
                logger.LogCritical(e, "Cannot retrieve albums");
                throw;
            }
        }
        [HttpGet]
        [Route("details/{id}")]
        // GET: MusicAlbums/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var musicAlbum = await _context.Albums
                .FirstOrDefaultAsync(m => m.Id == id);
            if (musicAlbum == null)
            {
                return NotFound();
            }

            return View(musicAlbum);
        }

        // GET: MusicAlbums/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MusicAlbums/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name")] MusicAlbum musicAlbum)
        {
            if (ModelState.IsValid)
            {
                musicAlbum.Id = Guid.NewGuid();
                _context.Add(musicAlbum);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(musicAlbum);
        }

        [HttpGet]
        [Route("edit/{id}")]
        // GET: MusicAlbums/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var musicAlbum = await _context.Albums.FindAsync(id);
            if (musicAlbum == null)
            {
                return NotFound();
            }
            return View(musicAlbum);
        }

        // POST: MusicAlbums/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Name")] MusicAlbum musicAlbum)
        {
            if (id != musicAlbum.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(musicAlbum);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MusicAlbumExists(musicAlbum.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(musicAlbum);
        }

        // GET: MusicAlbums/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var musicAlbum = await _context.Albums
                .FirstOrDefaultAsync(m => m.Id == id);
            if (musicAlbum == null)
            {
                return NotFound();
            }

            return View(musicAlbum);
        }

        // POST: MusicAlbums/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var musicAlbum = await _context.Albums.FindAsync(id);
            _context.Albums.Remove(musicAlbum);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MusicAlbumExists(Guid id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }
    }
}
