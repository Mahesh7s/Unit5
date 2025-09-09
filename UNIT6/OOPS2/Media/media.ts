// Step 1: Define MediaFile interface
interface MediaFile {
  play(): void;
}

// Step 2: Implement AudioFile
class AudioFile implements MediaFile {
  play(): void {
    console.log("Playing audio file...");
  }
}

// Step 3: Implement VideoFile
class VideoFile implements MediaFile {
  play(): void {
    console.log("Playing video file...");
  }
}

// Step 4: Implement PDFFile
class PDFFile implements MediaFile {
  play(): void {
    console.log("Displaying PDF document...");
  }
}

// Step 5: MediaPlayer that uses MediaFile
class MediaPlayer {
  private mediaFile: MediaFile;

  constructor(mediaFile: MediaFile) {
    this.mediaFile = mediaFile;
  }

  playMedia(): void {
    this.mediaFile.play();
  }
}

// Main execution
const audioPlayer = new MediaPlayer(new AudioFile());
audioPlayer.playMedia();

const videoPlayer = new MediaPlayer(new VideoFile());
videoPlayer.playMedia();

const pdfPlayer = new MediaPlayer(new PDFFile());
pdfPlayer.playMedia();
