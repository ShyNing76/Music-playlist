let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let volumeControl = document.getElementById("volume");
let iconVolume = document.getElementById("iconVolume");
var currentSongIndex = 0;


// Tạo danh sách các bài hát
var songs = [
    { title: "Những Lời Hứa Bỏ Quên", artist: "VŨ. X DEAR JANE", file: "media/music/Nhưng Lơi Hưa Bo Quên - Vu. (Xmas Live Session).mp3", img: "media/Image/Nhung loi hua bo quen img.jpg" },
    { title: "Bạn Đời", artist: "KARIK", file: "media/music/KARIK - BẠN ĐỜI (FT. GDUCKY) - OFFICIAL MUSIC VIDEO.mp3", img: "media/Image/Ban doi.jpg" },
    { title: "Từng Quen", artist: "WREN EVANS", file: "media/music/WREN EVANS - TỪNG QUEN - OFFICIAL AUDIO.mp3", img: "media/Image/tung quen.jpg" },
    { title: "GIẤC MƠ KHÁC", artist: "CHILLIES", file: "media/music/GIẤC MƠ KHÁC - CHILLIES (Official Music Video).mp3", img: "media/Image/giac mo khac.jpg" },
    { title: "Dành Cho Em", artist: "Hoàng Dũng x Orange", file: "media/music/Hoàng Dũng x Orange - Dành Cho Em - Live at yên Concert.mp3", img: "media/Image/danh cho em.jpg" },
    { title: "Tell The Kid I Love Them", artist: "Obito - Shiki", file: "media/music/Obito - Tell The Kids I Love Them ft. SHIKI.mp3", img: "media/Image/tell the kid i love them.jpg" },
    { title: "Có Em", artist: "Madihu ft. Low G", file: "media/music/Madihu - Có em (Feat. Low G) [Official MV].mp3", img: "media/Image/co em.jpg" },
    { title: "Chỉ Một Đêm Nữa Thôi", artist: "RPT MCK ft. tlinh ", file: "media/music/06. Chỉ Một Đêm Nữa Thôi - RPT MCK ( ft. tlinh ) - - 99_ - the album.mp3", img: "media/Image/chi mot dem nua thoi.jpg" },
    { title: "LẦN CUỐI", artist: "Ngọt", file: "media/music/Ngọt - LẦN CUỐI (đi bên em xót xa người ơi).mp3", img: "media/Image/lan cuoi.jpg" },
    { title: "Một Triệu Like", artist: "Đen ft. Thành Đồng", file: "media/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3", img: "media/Image/mot trieu like.jpg" },
    
];

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}


function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

volumeControl.addEventListener("input", function() {
    song.volume = volumeControl.value;
});

function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    playSong(songs[currentSongIndex].file, songs[currentSongIndex].img, songs[currentSongIndex].title, songs[currentSongIndex].artist);
}

function nextSong() {
    currentSongIndex++;
    if(currentSongIndex >= songs.length)
    {
        currentSongIndex = 0;
    }
    playSong(songs[currentSongIndex].file, songs[currentSongIndex].img, songs[currentSongIndex].title, songs[currentSongIndex].artist);
}

// Volume section


function onoffVolume() {
    if(iconVolume.classList.contains("fa-volume-high"))
    {
        iconVolume.classList.remove("fa-volume-high");
        iconVolume.classList.add("fa-volume-xmark");
        volumeControl.value = 0;
        song.volume = 0;
    }
    else{
        iconVolume.classList.add("fa-volume-high");
        iconVolume.classList.remove("fa-volume-xmark");
        volumeControl.value = 1;
        song.volume = 1;
    }
}


song.addEventListener("timeupdate", function() {
    progress.value = song.currentTime;
});

progress.oninput = function() {
    song.currentTime = progress.value;
};

// When ended music 

song.onended = function() {
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
};





// Hiển thị danh sách bài hát
function showPlaylist() {
    var playlist = document.getElementById('playlist');
    var songList = document.getElementById('songlist');
    var playlistIcon = document.getElementById('playlistIcon');
    var icon = playlistIcon.querySelector('i');

    if (playlist.style.display === 'none') {
        playlist.style.display = 'block'; // Hiển thị playlist khi ẩn
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');

        // Tạo các mục danh sách bài hát từ mảng songs
        songs.forEach(function(song) {
            var li = document.createElement('li');
            li.classList.add('song-item');

            var songTitle = document.createElement('span');
            songTitle.textContent = song.title;
            var songArtist = document.createTextNode(song.artist);

            
            li.appendChild(songTitle);
            li.appendChild(document.createElement('br'));
            li.appendChild(songArtist);
            

            li.setAttribute('onclick', 'playSong("' + song.file + '", "' + song.img + '", "' + song.title + '", "' + song.artist + '" )');
            songList.appendChild(li);
            
        });
    } else {
        playlist.style.display = 'none'; // Ẩn playlist nếu đã hiển thị
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
        // Xóa danh sách bài hát khi ẩn playlist
        while (songList.firstChild) {
            songList.removeChild(songList.firstChild);
        }
    }
}

// Phát bài hát được chọn
function playSong(songFile, imgFile, Title, Artist) {
    var audio = document.getElementById('song');
    var songImg = document.querySelector('.song-img');
    var title = document.querySelector('.song-title');
    var artist = document.querySelector('.song-artist');

    audio.src = songFile;
    songImg.src = imgFile;
    title.textContent = Title;
    artist.textContent = Artist; 

    
    audio.play();

}
