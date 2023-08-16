// https://lospec.com/palette-list/a-short-hike
var bg_colors = [
    "#4a5933",
    "#bdc039",
    "#ebd477",
    "#c0ac3f",
    "#da8332",
    "#ffb55c",
    //"#f2685b",
    "#c1492c",
    //"#a73428",
]
var water_colors = [
    "#43a29c",
    "#6cc7c0",
] 
var cloud_colors = [
    "#ebddda",
    "#c9bcb4",
    "#846e5a",
] 

function autoPaintBg() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.globalAlpha = 0.9;

    var topFill = cloud_colors[Math.floor(Math.random() * cloud_colors.length)];
    var midFill = bg_colors[Math.floor(Math.random() * bg_colors.length)];
    var botFill = water_colors[Math.floor(Math.random() * water_colors.length)];

    setInterval(() => {
        if (Math.random() > 0.75) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = 10 + (Math.random() * 140);

            if (Math.random() > 0.9) {
                topFill = cloud_colors[Math.floor(Math.random() * cloud_colors.length)];
                midFill = bg_colors[Math.floor(Math.random() * bg_colors.length)];
                botFill = water_colors[Math.floor(Math.random() * water_colors.length)];
            }

            if (y < canvas.height * 0.75 / 5.0) {
                ctx.fillStyle = topFill;
            } else if (y < canvas.height * 4.0 / 5.0) {
                ctx.fillStyle = midFill;
            } else {
                ctx.fillStyle = botFill;
            }

            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, 20);
}

var music = new Audio('./res/thinking-about-the-universe-v2.mp3');
music.loop = true;

function musicTime() {
    const MAX = 200;
    if (music.paused) {
        music.play();
        for (let i = 0; i < MAX; i++) {
            setTimeout(() => { 
                if (music.volume >= ((MAX-2)/(MAX-1))) {
                    music.volume = 1.0;
                } else {
                    music.volume += 1 / (MAX-1);
                }
            }, 3 * i);
        }
        setTimeout(() => { 
            music.volume = 1.0;
        }, 3 * MAX);
    } else {
        for (let i = 0; i < MAX; i++) {
            setTimeout(() => { 
                console.log(music.volume); 
                if (music.volume <= (1 / (MAX-1))) {
                    music.volume *= 0.6;
                } else {
                    music.volume -= 1 / (3*MAX-1);
                    music.volume *= 0.989;
                }
            }, 3 * i);
        }
        setTimeout(() => { 
            music.pause();
        }, 3 * MAX);
    }
}