/* =========================
   SONG LIST
========================= */

const songs = [


    {
        title:"Night Vibes",
        artist:"Dream Audio",

        src:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

        cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80"
    },

    {
        title:"Chill Beats",
        artist:"Luna Waves",

        src:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",

        cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80"
    },

    {
        title:"Future Bass",
        artist:"Nova Music",

        src:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",

        cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80"
    }

];

/* =========================
   SELECT ELEMENTS
========================= */

const audio =
document.getElementById("audio");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const cover =
document.getElementById("cover");

const playBtn =
document.getElementById("play");

const prevBtn =
document.getElementById("prev");

const nextBtn =
document.getElementById("next");

const progress =
document.getElementById("progress");

const progressContainer =
document.getElementById("progress-container");

const currentTime =
document.getElementById("current-time");

const duration =
document.getElementById("duration");

const volume =
document.getElementById("volume");

const playlist =
document.getElementById("playlist");

/* =========================
   VARIABLES
========================= */

let songIndex = 0;

let isPlaying = false;

/* =========================
   LOAD SONG
========================= */

function loadSong(song){

    title.textContent =
    song.title;

    artist.textContent =
    song.artist;

    cover.src =
    song.cover;

    audio.src =
    song.src;

    updatePlaylist();

}

/* =========================
   PLAY SONG
========================= */

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.textContent = "⏸";

}

/* =========================
   PAUSE SONG
========================= */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶";

}

/* =========================
   PLAY/PAUSE
========================= */

playBtn.addEventListener(
    "click",
    () => {

        if(isPlaying){

            pauseSong();

        }

        else{

            playSong();

        }

    }
);

/* =========================
   NEXT SONG
========================= */

function nextSong(){

    songIndex++;

    if(songIndex > songs.length - 1){

        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();

}

/* =========================
   PREVIOUS SONG
========================= */

function prevSong(){

    songIndex--;

    if(songIndex < 0){

        songIndex =
        songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();

}

nextBtn.addEventListener(
    "click",
    nextSong
);

prevBtn.addEventListener(
    "click",
    prevSong
);

/* =========================
   UPDATE PROGRESS
========================= */

audio.addEventListener(
    "timeupdate",
    updateProgress
);

function updateProgress(){

    const {

        duration:dur,
        currentTime:curr

    } = audio;

    const percent =
    (curr / dur) * 100;

    progress.style.width =
    `${percent}%`;

    /* CURRENT TIME */

    let currentMinutes =
    Math.floor(curr / 60);

    let currentSeconds =
    Math.floor(curr % 60);

    if(currentSeconds < 10){
        currentSeconds = "0" + currentSeconds;
    }

    currentTime.textContent =
    `${currentMinutes}:${currentSeconds}`;

    /* DURATION */

    let durationMinutes =
    Math.floor(dur / 60);

    let durationSeconds =
    Math.floor(dur % 60);

    if(durationSeconds < 10){
        durationSeconds = "0" + durationSeconds;
    }

    if(dur){

        duration.textContent =
        `${durationMinutes}:${durationSeconds}`;

    }

}

/* =========================
   SET PROGRESS
========================= */

progressContainer.addEventListener(
    "click",
    setProgress
);

function setProgress(e){

    const width =
    this.clientWidth;

    const clickX =
    e.offsetX;

    const dur =
    audio.duration;

    audio.currentTime =
    (clickX / width) * dur;

}

/* =========================
   VOLUME CONTROL
========================= */

volume.addEventListener(
    "input",
    (e) => {

        audio.volume =
        e.target.value;

    }
);

/* =========================
   AUTOPLAY NEXT SONG
========================= */

audio.addEventListener(
    "ended",
    nextSong
);

/* =========================
   PLAYLIST
========================= */

function createPlaylist(){

    songs.forEach((song,index) => {

        const div =
        document.createElement("div");

        div.classList.add("song");

        div.innerHTML = `
            <strong>${song.title}</strong>
            <br>
            <small>${song.artist}</small>
        `;

        div.addEventListener(
            "click",
            () => {

                songIndex = index;

                loadSong(song);

                playSong();

            }
        );

        playlist.appendChild(div);

    });

}

function updatePlaylist(){

    const items =
    document.querySelectorAll(".song");

    items.forEach((item,index) => {

        item.classList.remove("active");

        if(index === songIndex){

            item.classList.add("active");

        }

    });

}

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
    "keydown",
    (e) => {

        if(e.code === "Space"){

            e.preventDefault();

            if(isPlaying){

                pauseSong();

            }

            else{

                playSong();

            }

        }

        if(e.code === "ArrowRight"){

            nextSong();

        }

        if(e.code === "ArrowLeft"){

            prevSong();

        }

    }
);

/* =========================
   INITIALIZE
========================= */

loadSong(songs[songIndex]);

createPlaylist();
