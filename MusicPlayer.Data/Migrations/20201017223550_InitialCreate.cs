using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MediaPlayer.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Albums",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    HasMetaData = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(maxLength: 128, nullable: false),
                    SortableTitle = table.Column<string>(nullable: true),
                    Artists = table.Column<string>(nullable: true),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Artists",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    HasMetaData = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 64, nullable: false),
                    SortName = table.Column<string>(nullable: true),
                    Biography = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tracks",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    HasMetaData = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(maxLength: 128, nullable: false),
                    Album = table.Column<string>(nullable: false),
                    Artist = table.Column<string>(nullable: true),
                    Duration = table.Column<int>(nullable: false),
                    FilePath = table.Column<string>(nullable: false),
                    Notation = table.Column<int>(nullable: false),
                    SampleRate = table.Column<int>(nullable: false),
                    Bitrate = table.Column<int>(nullable: false),
                    Channels = table.Column<int>(nullable: false),
                    DiscNumber = table.Column<uint>(nullable: false),
                    TrackNumber = table.Column<uint>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tracks", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Albums");

            migrationBuilder.DropTable(
                name: "Artists");

            migrationBuilder.DropTable(
                name: "Tracks");
        }
    }
}
