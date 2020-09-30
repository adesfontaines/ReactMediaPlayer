using System;

namespace MusicPlayer.MediaWorker
{
  class Program
  {
    static void Main(string[] args)
    {
      MediaWorker mw = new MediaWorker();
      Console.Write("Read files in: " + args[0]);
      mw.ImportFromFolder(args[0]);
      Console.ReadKey();
    }
  }
}
