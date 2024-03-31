const music = new Audio('audio/3.mp3');
//music.play();

let songs = [
    {
        id: '1',
        songName: `Tere Hawaale<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/1.jpg",
    },
    {
        id: '2',
        songName: `Heeriye<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/2.jpg",
    },
    {
        id: '3',
        songName: `Ae Dil Hai Mushkil<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/3.jpg",
    },
    {
        id: '4',
        songName: `Phir Aur Kya Chahiye<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/4.jpg",
    },
    {
        id: '5',
        songName: `Agar Tum Sath Ho<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/5.jpg",
    },
    {
        id: '6',
        songName: `Kesariya<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/6.jpg",
    },
    {
        id: '7',
        songName: `Apna Bana Le<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/7.jpg",
    },
    {
        id: '8',
        songName: `Shayad<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/8.jpg",
    },
    {
        id: '9',
        songName: `What Jhumka?<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/9.jpg",
    },
    {
        id: '10',
        songName: `Tera Yaar Hoon Main<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/10.jpg",
    },
    {
        id: '11',
        songName: `Channa Mereya<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/11.jpg",
    },
    {
        id: '12',
        songName: `Gerua<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/12.jpg",
    },
    {
        id: '13',
        songName: `Janam Janam<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/13.jpg",
    },
    {
        id: '14',
        songName: `Tere Pyaar Mein<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/14.jpg",
    },
    {
        id: '15',
        songName: `Pyaar Hota Kayi Baar Hai<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/Arijit/15.jpg",
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105 , 105 , 105 , .0)';
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster-master-play');
let download_music = document.getElementById('download-music');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        //console.log(index);
        music.src = `audio/Arijit/${index}.mp3`;
        poster_master_play.src = `image/Arijit/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href = `audio/Arijit/${index}.mp3`;
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach((elss) => {
            let { songName } = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105 , 105 , 105 , .1)';
        makeAllPlays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');

    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_dur);

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    //console.log(min1);

    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }

    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);

    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    //console.log(seek.value);

    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;


})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol-icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol-bar')[0];
let vol_dot = document.getElementById('vol-dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/Arijit/${index}.mp3`;
    poster_master_play.src = `image/Arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105 , 105 , 105 , .1)';
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
});

next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `audio/Arijit/${index}.mp3`;
    poster_master_play.src = `image/Arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105 , 105 , 105 , .1)';
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})

let pop_song_left = document.getElementById('pop-song-left');
let pop_song_right = document.getElementById('pop-song-right');
let pop_songs = document.getElementsByClassName('pop-songs')[0];

pop_song_right.addEventListener('click', () => {
    pop_songs.scrollLeft += 300;
})

pop_song_left.addEventListener('click', () => {
    pop_songs.scrollLeft -= 300;
})

let pop_art_left = document.getElementById('pop-art-left');
let pop_art_right = document.getElementById('pop-art-right');
let item = document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click', () => {
    item.scrollLeft += 300;
})

pop_art_left.addEventListener('click', () => {
    item.scrollLeft -= 300;
})

let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;

        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;

        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});

music.addEventListener('ended', () => {  
   
})

const next_music = () => {
    //index++;
     if (index == songs.length) {
        index = 1;
    } else {
        index++;
    }
    music.src = `audio/Arijit/${index}.mp3`;
    poster_master_play.src = `image/Arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/Arijit/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105 , 105 , 105 , .1)';
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

const repeat_music = () => {
    index;
    music.src = `audio/Arijit/${index}.mp3`;
    poster_master_play.src = `image/Arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/Arijit/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105 , 105 , 105 , .1)';
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

const random_music = () => {
    if (index == songs.length) {
        index = 1;
    } else {
        index = Math.floor((Math.random() * songs.length)+1);
    }
    music.src = `audio/Arijit/${index}.mp3`;
    poster_master_play.src = `image/Arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/Arijit/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105 , 105 , 105 , .1)';
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

music.addEventListener('ended', () => {  
   let b = shuffle.innerHTML;
   switch (b) {
    case 'repeat':
        repeat_music();
        break;
   
    case 'next':
        next_music();
        break;
    
    case 'random':
        random_music();
        break;
   }
})

