using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MusicPlayer.Data;
using System;

namespace MediaPlayer.Server
{
    public class Startup
    {
        readonly string MediaServerAppPolicyName = "MediaServerAppPolicy";
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("config.json", optional: false)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy(MediaServerAppPolicyName, builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
            services.AddControllers();
            services.AddSingleton(Configuration);
            services.AddDbContextPool<MusicPlayerDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("MusicPlayerDb"));
            });

            services.AddControllers();
            services.AddScoped<IMusicTrackData, MusicTrackData>();
            services.AddScoped<IMusicAlbumData, MusicAlbumData>();
            services.AddScoped<IMusicArtistData, MusicArtistData>();
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(MediaServerAppPolicyName);
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "/api/{controller}/{action=Index}/{id?}");
                endpoints.MapGet("/api", async context =>
                {
                    await context.Response.WriteAsync("Welcome to ReactMusic API !");
                });
            });

            app.UseHttpContext();

        }
    }
}
