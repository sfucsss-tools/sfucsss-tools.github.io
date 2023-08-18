// https://lospec.com/palette-list/a-short-hike
var bg_colors = [
    "#4a5933",
    "#bdc039", "#bdc039",
    "#ebd477", "#ebd477",
    "#c0ac3f",
    "#da8332",
    //"#ffb55c",
    //"#f2685b",
    "#c1492c",
    //"#a73428",
    
    "#a3b34e",
]
var water_colors = [
    "#43a29c",
    "#6cc7c0",
] 
var cloud_colors = [
    "#ebddda",
    "#c9bcb4",
    //"#846e5a",
] 

// ---------------------------

function onloadMain() {
    autoPaintBg();
    loadMusic();
}

function onloadTentativeGrantRequest() {
    document.getElementById("largeScaleEvent").addEventListener("change", updateLargeScaleEvent);

    tentativeGrantRequest_LoadChanges();
    tentativeGrantRequest_TrackChanges();
}

// ---------------------------

function autoPaintBg() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.globalAlpha = 0.92;

    var topFill = cloud_colors[Math.floor(Math.random() * cloud_colors.length)];
    var midFill = bg_colors[Math.floor(Math.random() * bg_colors.length)];
    var botFill = water_colors[Math.floor(Math.random() * water_colors.length)];

    setInterval(() => {
        if (Math.random() > 0.65) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = 40 + (Math.random() * 90);

            if (Math.random() > 0.9) {
                topFill = cloud_colors[Math.floor(Math.random() * cloud_colors.length)];
                midFill = bg_colors[Math.floor(Math.random() * bg_colors.length)];
                botFill = water_colors[Math.floor(Math.random() * water_colors.length)];
            }

            if (y < canvas.height * 0.75 / 5.0) {
                ctx.fillStyle = topFill;
            } else if (y < canvas.height * 3.5 / 5.0) {
                ctx.fillStyle = midFill;
            } else {
                ctx.fillStyle = botFill;
            }

            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, 35);
}

var music;
function loadMusic() {
    music = new Audio('./res/thinking-about-the-universe-v2.mp3');
    music.loop = true;
}

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

// -----------------

function updateLargeScaleEvent() {
    if (document.getElementById("largeScaleEventDesc").style.display == "block") {
        document.getElementById("largeScaleEventDesc").style.display = "none";
    } else {
        document.getElementById("largeScaleEventDesc").style.display = "block";
    }
}

function updateGuestSpeakers() {
    if (document.getElementById("guestSpeakersDesc").style.display == "block") {
        document.getElementById("guestSpeakersDesc").style.display = "none";
    } else {
        document.getElementById("guestSpeakersDesc").style.display = "block";
    }
}

function updateEventRevenue() {
    if (document.getElementById("eventRevenueDesc").style.display == "block") {
        document.getElementById("eventRevenueDesc").style.display = "none";
    } else {
        document.getElementById("eventRevenueDesc").style.display = "block";
    }
}

// ---------------
// form local storage as inputting data for tentative grant request

var formItemIds = [
    "ProjectType", 
    "ProjectName",
    "ProjectLocation",
    "BookingConfirmed",
    "EventDates",
    "EventDesc",
    "EventItinerary",
    "EventAlignment",
    "EventSus",
    "EventSpeakers",
    "ExtraDesc",

    "UnionMembers",
    "NonUnionMembers",
    "Staff",
    "GeneralPublic",
    "Guests",
    "CollaboratorList",
    "PastOrganize",

    "EventRevenue",
    "OtherInput",
    "CoreContribution",
    //"MeetingMinutes",

    "RequestAmount",
    "MoneyUsage",
];
var checkboxFormItemIds = [
    "largeScaleEvent",
    "guestSpeakers",
    "eventRevenue",

    "RevenuePlan0",
    "RevenuePlan1",
    "RevenuePlan2",
    "RevenuePlan3",
    "RevenuePlan4",
];

function tentativeGrantRequest_ResetChanges() {
    if (typeof(Storage) === "undefined") {
        console.log("Sorry! No Web Storage support..")
        return;
    }

    if (document.getElementById("largeScaleEvent").checked != "") {
        updateLargeScaleEvent();
    }
    if (document.getElementById("guestSpeakers").checked != "") {
        updateGuestSpeakers();
    }
    if (document.getElementById("eventRevenue").checked != "") {
        updateEventRevenue();
    }

    formItemIds.forEach((name) => {
        localStorage.setItem(name + ".value", "");
    });
    checkboxFormItemIds.forEach((name) => {
        localStorage.setItem(name + ".checked", ""); // checkbox
    });
    tentativeGrantRequest_LoadChanges();
}

function tentativeGrantRequest_LoadChanges() {
    if (typeof(Storage) === "undefined") {
        console.log("Sorry! No Web Storage support..")
        return;
    }

    formItemIds.forEach((name) => {
        document.getElementById(name).value = localStorage.getItem(name + ".value");
    });
    checkboxFormItemIds.forEach((name) => {
        document.getElementById(name).checked = localStorage.getItem(name + ".checked");
    });
}

function tentativeGrantRequest_TrackChanges() {
    if (typeof(Storage) === "undefined") {
        console.log("Sorry! No Web Storage support..")
        return;
    }

    formItemIds.forEach((name) => {
        document.getElementById(name).addEventListener("change", (event) => {
            localStorage.setItem(name + ".value", event.target.value);
            console.log(event.target.value);
        });
    });
    checkboxFormItemIds.forEach((name) => {
        document.getElementById(name).addEventListener("change", (event) => {
            localStorage.setItem(name + ".checked", event.target.checked ? "true" : "");
            console.log(event.target.checked);
        });
    });

    if (document.getElementById("largeScaleEvent").checked != "") {
        updateLargeScaleEvent();
    }
    if (document.getElementById("guestSpeakers").checked != "") {
        updateGuestSpeakers();
    }
    if (document.getElementById("eventRevenue").checked != "") {
        updateEventRevenue();
    }
}
