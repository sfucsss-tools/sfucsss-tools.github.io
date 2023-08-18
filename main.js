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

// TODO: move this stuff to its own file eventually
// saviour!
const { jsPDF } = "jspdf" in window ? window.jspdf : null;
const { PDFDocument } = "PDFLib" in window ? window.PDFLib : null;
function onloadTentativeGrantRequest() {
    document.getElementById("largeScaleEvent").addEventListener("change", updateLargeScaleEvent);
    document.getElementById("submit").addEventListener("click", generateTentativeGrantRequest);

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
    "MeetingMinutes",
    "MotionNumber",

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
var sectionIds = [
    "sectionA", "sectionB", "sectionC", "sectionD"
]

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

function generateTentativeGrantRequest(_event) {    
    // validate meeting minutes file is a pdf:

    // TODO: add a checkbox to bypass this & just not attach a file
    if (document.getElementById("MeetingMinutes").value == "") {
        alert("no meeting minutes uploaded, grant request canceled");
        return;
    } else if (!document.getElementById("MeetingMinutes").files[0].name.endsWith('.pdf')) {
        alert("invalid file uploaded; must be .pdf");
        return;
    }

    // make a copy of the DOM to eventually generate a pdf with
    let newBody = document.querySelector("#content").cloneNode(true);
    newBody.style.width = "650px"; 
    newBody.style.margin = "0"; 
    const PADDING_AMOUNT = 64;
    newBody.style.paddingLeft = PADDING_AMOUNT + "px"; 
    newBody.style.paddingRight = PADDING_AMOUNT + "px"; 

    {
        // clean up unnecessary description & formatting
        for (let i = 0; i < 15; i++)
            newBody.children[0].remove();
        for (let i = 0; i < 6; i++)
            newBody.children[0].children[newBody.children[0].children.length - 1].remove();
        
        for (let i = 0; i < 16; i++)
            newBody.childNodes[0].remove();

        formItemIds.forEach((id) => {
            let value = document.getElementById(id).value;
            newBody.querySelector("#" + id).outerHTML = "<p style='background-color:#ffeda6; padding: 10px; white-space: pre-wrap; display: inline-block; width: calc(100% - 36px);'><b>" + value + " </b></p>";
        });

        sectionIds.forEach((id) => {
            // TODO: using sectionIds, split the pdf into 4 documents & combine them with page breaks after each major section
        });
    }

    const PDF_MARGIN_W = 8;
    var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [210, 297],
    });
    let options = {
        callback: (doc) => {
            let mergeMeetingMinutes = async (basePDF) => {
                let meetingMinutesPDFArrayBuffer = await document.getElementById("MeetingMinutes").files[0].arrayBuffer();
                let pdfList = [basePDF, meetingMinutesPDFArrayBuffer]
                
                const mergedPdf = await PDFDocument.create();
                const actions = pdfList.map(async pdfBuffer => {
                    const pdf = await PDFDocument.load(pdfBuffer);
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => {
                        // console.log('page', page.getWidth(), page.getHeight());
                        // page.setWidth(210);
                        mergedPdf.addPage(page);
                    });
                });
                await Promise.all(actions);
                const mergedPdfFile = await mergedPdf.save();
                return mergedPdfFile;
            };

            // download file
            function saveByteArray(name, byte) {
                var blob = new Blob([byte], {type: "application/pdf"});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.click();
            };

            var arrayBuffer = doc.output("arraybuffer");
            mergeMeetingMinutes(arrayBuffer).then((mergedPDFArrayBuffer) => {
                let name = "tentativeGrantRequest_" + document.getElementById("ProjectName").value + ".pdf";
                saveByteArray(name, mergedPDFArrayBuffer);
            });
        },
        autoPaging: 'text',
        margin: [12, PDF_MARGIN_W, 15, PDF_MARGIN_W],
        html2canvas: {
            // https://html2canvas.hertzen.com/configuration
            scale: (210 - 2 * PDF_MARGIN_W) / (650 + 2 * PADDING_AMOUNT),
        },
    };
    doc.html(newBody, options);
}
