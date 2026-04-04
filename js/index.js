// ----- Functions -----

function toggle_page(index, human) {
    urlParams.set('page', index);
    const newSearch = '?' + urlParams.toString();
    window.history.pushState({}, '', newSearch);

    if (human) {
        let path = '../resources/audio/' + (Math.random() < 0.5 ? 'paper1.mp3' : 'paper2.mp3')
        audio.children[0].src = path;
        audio.play();
    }

    Array.from(document.getElementsByClassName("content")).forEach((e) => {
        if (e.className.includes("page-"+index)) {
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    });

    for (var i = 1; i < 7; i++) {
        var navbar_e = document.getElementById(i.toString());

        if (i == index){
            navbar_e.style.color = "#ed3647"; // Pink
        } else {
            navbar_e.style.color = "#000000";
        }
    }

};

function h2_dropdowns() {
    // Make ul dropdown
    Array.from(document.getElementsByTagName("h2")).forEach((e) => {
        if (!e.parentNode.className.includes("page-2")) return;
        let sib = e.nextElementSibling;
        if (sib === null || sib.nodeName != "UL") return;

        e.style.cursor = "pointer";

        e.addEventListener("click", (event) => {
            event.preventDefault();
            if (sib.style.opacity == "0") {
                sib.style.position = "relative";
                sib.style.opacity = "100";
                sib.style.pointerEvents = "";
            } else {
                sib.style.position = "fixed";
                sib.style.opacity = "0";
                sib.style.pointerEvents = "none";
            }
        })

        e.click();
    });
}

// ----- On load code -----

// Assign according icons to listed documents
Array.from(document.getElementsByTagName("li")).forEach((e) => {
    if (e.parentNode.parentNode.className.includes("page-4")) return;
    let first = e.children[0];
    if (!first) return;
    if (first.nodeName === "A") {
        first.style.position = "relative";
        first.style.bottom = "10px";
        if (first.href.slice(-4) === ".pdf") {
            e.style.listStyleImage = "url('resources/logos/pdf.webp')";
        } else {
            e.style.listStyleImage = "url('resources/logos/link.png')";
        }
    }
});

// Link navbar to pages
Array.from(document.getElementsByClassName("droplabel")).forEach((e) => {
    e.addEventListener("click", (event) => {
        event.preventDefault();
        toggle_page(e.id, true);
    })
});

// Fill dinkus'
Array.from(document.getElementsByClassName("dinkus")).forEach((e) => {
    e.innerText = "***";
});

// Initial page grab and toggle
let urlParams = new URLSearchParams(window.location.search);
let page_idx = urlParams.get('page') || 1; // Default to page 1

var audio = document.getElementById("audio");
audio.volume = 0.2;

toggle_page(page_idx, false);
h2_dropdowns();

