let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let volumeControl = document.getElementById("volume");
let iconVolume = document.getElementById("iconVolume");


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


song.onended = function() {
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
};


// Playlist 

function showPlaylist() {
    var playlist = document.getElementById('playlist');
    if (playlist.style.display === 'none') {
        playlist.style.display = 'block'; // Hiển thị playlist khi ẩn
    } else {
        playlist.style.display = 'none'; // Ẩn playlist nếu đã hiển thị
    }
}



// Tạo danh sách các bài hát
var songs = [
    { title: "Những Lời hứa bỏ quên", artist: "VŨ", file: "media/Nhưng Lơi Hưa Bo Quên - Vu. (Xmas Live Session).mp3" },
    { title: "Bạn Đời", artist: "KARIK", file: "media/KARIK - BẠN ĐỜI (FT. GDUCKY) - OFFICIAL MUSIC VIDEO.mp3" },
    { title: "Từng Quen", artist: "WREN EVANS", file: "media/WREN EVANS - TỪNG QUEN - OFFICIAL AUDIO.mp3" },
    // Thêm các bài hát khác nếu cần
];

// Hiển thị danh sách bài hát
function showPlaylist() {
    var playlist = document.getElementById('playlist');
    var songList = document.getElementById('songlist');

    if (playlist.style.display === 'none') {
        playlist.style.display = 'block'; // Hiển thị playlist khi ẩn

        // Tạo các mục danh sách bài hát từ mảng songs
        songs.forEach(function(song) {
            var li = document.createElement('li');
            var songTitle = document.createElement('span');
            songTitle.textContent = song.title;
            var songArtist = document.createTextNode(song.artist);

            
            li.appendChild(songTitle);
            li.appendChild(document.createElement('br'));
            li.appendChild(songArtist);
            
            
            li.setAttribute('onclick', 'playSong("' + song.file + '")');
            songList.appendChild(li);
            
        });
    } else {
        playlist.style.display = 'none'; // Ẩn playlist nếu đã hiển thị

        // Xóa danh sách bài hát khi ẩn playlist
        while (songList.firstChild) {
            songList.removeChild(songList.firstChild);
        }
    }
}

// Phát bài hát được chọn
function playSong(songFile) {
    var audio = document.getElementById('song');
    audio.src = songFile;
    audio.play();
}
