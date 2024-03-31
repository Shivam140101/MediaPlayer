const music = new Audio('audio/3.mp3');
//music.play();

let songs = [
    {
        id: '1',
        songName: `On My Way<br><div class="subtitle">Alan Walker</div>`,
        poster: "image/1.jpg",
    },
    {
        id: '2',
        songName: `Apna Bana Le<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/2.jpg",
    },
    {
        id: '3',
        songName: `Aankhein<br><div class="subtitle">Vilen</div>`,
        poster: "image/3.jpg",
    },
    {
        id: '4',
        songName: `Chaleya<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/4.jpg",
    },
    {
        id: '5',
        songName: `Check It Out<br><div class="subtitle">Parmish and Paradox</div>`,
        poster: "image/5.jpg",
    },
    {
        id: '6',
        songName: `Crown<br><div class="subtitle">King</div>`,
        poster: "image/6.jpg",
    },
    {
        id: '7',
        songName: `Heeriye<br><div class="subtitle">Arijit Singh and Jasleen Royal</div>`,
        poster: "image/7.jpg",
    },
    {
        id: '8',
        songName: `Jee Ni Lagda<br><div class="subtitle">Karan Aujla</div>`,
        poster: "image/8.jpg",
    },
    {
        id: '9',
        songName: `Laapata<br><div class="subtitle">King</div>`,
        poster: "image/9.jpg",
    },
    {
        id: '10',
        songName: `Mirchi<br><div class="subtitle">Divine</div>`,
        poster: "image/10.jpg",
    },
    {
        id: '11',
        songName: `No Reason<br><div class="subtitle">Parmish Verma</div>`,
        poster: "image/11.jpg",
    },
    {
        id: '12',
        songName: `Oops<br><div class="subtitle">King</div>`,
        poster: "image/12.jpg",
    },
    {
        id: '13',
        songName: `Pasoori<br><div class="subtitle">Ali Sethi and Shae Gill</div>`,
        poster: "image/13.jpg",
    },
    {
        id: '14',
        songName: `Players<br><div class="subtitle">Karan Aujla and Badshah</div>`,
        poster: "image/14.jpg",
    },
    {
        id: '15',
        songName: `Rehbara<br><div class="subtitle">Vilen</div>`,
        poster: "image/15.jpg",
    },
    {
        id: '16',
        songName: `Shauq<br><div class="subtitle">Amit Trivedi</div>`,
        poster: "image/16.jpg",
    },
    {
        id: '17',
        songName: `Softly<br><div class="subtitle">Karn Aujla</div>`,
        poster: "image/17.jpg",
    },
    {
        id: '18',
        songName: `Tere Hawale<br><div class="subtitle">Arijit Singh</div>`,
        poster: "image/18.jpg",
    },
    {
        id: '19',
        songName: `Tere Pyaar Mein<br><div class="subtitle">Arijit Singh and Nikhita Gandhi</div>`,
        poster: "image/19.jpg",
    },
    {
        id: '20',
        songName: `The Last Ride<br><div class="subtitle">Sidhu Moosewala</div>`,
        poster: "image/20.jpg",
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

// search data Start
let search_results = document.getElementsByClassName('search-results')[0];

songs.forEach(element => {
    const { id, songName, poster } = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
                            <div class="content">
                                ${songName}
                            </div>
    `;

    search_results.appendChild(card);
});

let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup', () => {
    let input_value = input.value.toLocaleUpperCase();
    let items = search_results.getElementsByTagName('a');
    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;

        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = 'flex';
        } else {
            items[index].style.display = 'none';
        }

        if (input.value == 0) {
            search_results.style.display = 'none';
        } else {
            search_results.style.display = '';

        }

    }
})

// search data End

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
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `image/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href = `audio/${index}.mp3`;
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
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `image/${index}.jpg`;
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
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `image/${index}.jpg`;
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
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `image/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/${index}.mp3`;
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
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `image/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/${index}.mp3`;
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
        index = Math.floor((Math.random() * songs.length) + 1);
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `image/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/${index}.mp3`;
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

