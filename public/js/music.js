
const title = document.getElementById('music-title'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play');

const music = new Audio();



const songs = [
    {
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        displayName: 'Lofi 1 (Rain)',
    },
    {
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        displayName: 'Lofi 2 (Piano)',
    },
    {
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        displayName: 'Lofi 3 (Fire)',
    },
    {
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        displayName: 'Lofi 4 (Violins)',
    },
    {
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        displayName: 'Lofi 5 (Melody)',
    },
    {
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        displayName: 'Lofi 6 (Nature)',
    },
];


let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
 }


function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    if (!isNaN(duration)) {
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    }
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
