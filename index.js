const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");

// ===== DATA ===== //
const allSongs = [
  {
    id: 0,
    title: "Hello World",
    artist: "Rafael",
    duration: "0:23",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/hello-world.mp3",
  },
  {
    id: 1,
    title: "In the Zone",
    artist: "Rafael",
    duration: "0:11",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/in-the-zone.mp3",
  },
  {
    id: 2,
    title: "Camper Cat",
    artist: "Rafael",
    duration: "0:21",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/camper-cat.mp3",
  },
  {
    id: 3,
    title: "Electronic",
    artist: "Rafael",
    duration: "0:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/electronic.mp3",
  },
  {
    id: 4,
    title: "Sailing Away",
    artist: "Rafael",
    duration: "0:22",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/sailing-away.mp3",
  },
];

// ===== AUDIO OBJECT ===== //
const audio = new Audio();

const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0
};

// ===== PLAY ===== //
function playSong(id, start = true) {
  const song = userData.songs.find(s => s.id === id);

  audio.src = song.src;
  audio.title = song.title;

  // Resume or restart //
  audio.currentTime = start ? 0 : userData.songCurrentTime;

  userData.currentSong = song;

  updateDisplay();
  audio.play();
}

// ===== PAUSE ===== //
function pauseSong() {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
}

// ===== UPDATE UI ===== //
function updateDisplay() {
  playingSong.textContent = userData.currentSong?.title || "";
  songArtist.textContent = userData.currentSong?.artist || "";
}

// ===== NEXT ===== //
function playNextSong() {
  const index = userData.songs.indexOf(userData.currentSong);
  const next = userData.songs[index + 1];

  if (next) {
    playSong(next.id);
  }
}

// ===== PREVIOUS ===== //
function playPreviousSong() {
  const index = userData.songs.indexOf(userData.currentSong);
  const prev = userData.songs[index - 1];

  if (prev) {
    playSong(prev.id);
  }
}

playButton.addEventListener("click", () => {
  if (!userData.currentSong) {
    playSong(0);
  } else {
    playSong(userData.currentSong.id, false);
  }
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);

// Auto play next //
audio.addEventListener("ended", playNextSong);

// Playlist click  //
document.querySelectorAll(".playlist-song").forEach(song => {
  const id = Number(song.id.split("-")[1]);

  song.addEventListener("click", () => {
    playSong(id);
  });
});