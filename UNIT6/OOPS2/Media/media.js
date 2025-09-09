// Step 2: Implement AudioFile
var AudioFile = /** @class */ (function () {
    function AudioFile() {
    }
    AudioFile.prototype.play = function () {
        console.log("Playing audio file...");
    };
    return AudioFile;
}());
// Step 3: Implement VideoFile
var VideoFile = /** @class */ (function () {
    function VideoFile() {
    }
    VideoFile.prototype.play = function () {
        console.log("Playing video file...");
    };
    return VideoFile;
}());
// Step 4: Implement PDFFile
var PDFFile = /** @class */ (function () {
    function PDFFile() {
    }
    PDFFile.prototype.play = function () {
        console.log("Displaying PDF document...");
    };
    return PDFFile;
}());
// Step 5: MediaPlayer that uses MediaFile
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer(mediaFile) {
        this.mediaFile = mediaFile;
    }
    MediaPlayer.prototype.playMedia = function () {
        this.mediaFile.play();
    };
    return MediaPlayer;
}());
// Main execution
var audioPlayer = new MediaPlayer(new AudioFile());
audioPlayer.playMedia();
var videoPlayer = new MediaPlayer(new VideoFile());
videoPlayer.playMedia();
var pdfPlayer = new MediaPlayer(new PDFFile());
pdfPlayer.playMedia();
