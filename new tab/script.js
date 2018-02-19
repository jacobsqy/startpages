//---KLOCKA---\\
setInterval(clock, 1000);
clock();
function clock() {
	var time = new Date();
	var timma = ("0" + time.getHours()).slice(-2);		//ser till att det alltid är 2 siffrigt. T ex 01:09:02 istället för 1:9:2
	var minut = ("0" + time.getMinutes()).slice(-2);
	document.getElementById("klocka").innerHTML = timma + ":" + minut;
};


//---DATUM---\\
setInterval(datum, 1000);
datum();
function datum() {
	var time = new Date();
	var ar = time.getFullYear();
	var manad = ("0" + (time.getMonth() + 1)).slice(-2);		//time.getMonth() ger ett värde mellan 0-11. Därför krävs +1 för att få rätt värde. En nolla framför och slice(-2) ser till att det är 2 siffrigt. T ex 01/05/2016 istället för 1/5/2016
	var dag = ("0" + time.getDate()).slice(-2);
	document.getElementById("datum").innerHTML = dag + "/" + manad + "/" + ar;
}


//---SÖKBAR---\\
document.getElementById("sokinput").value = "";		//ser till att sökfältet är tomt även om man uppdaterar sidan

//fokuserar på sokinput då man klickar någonstans. förhindrar att inputfältet tappar fokus.
window.onclick = fokus;
function fokus() {
    document.getElementById("sokinput").focus();
}

function sok(){
    var sokinput = document.getElementById("sokinput").value;
    var punkt = sokinput.includes(".");
    var space = sokinput.includes(" ");
	var url = sokinput.includes("://");

    if(punkt && !space && !url){
	document.getElementById("sokinput").value = ""; //gör sökfältet tomt även när man går tillbaka
	window.location = "http://" + sokinput;
    } else if (url) {
	    document.getElementById("sokinput").value = "";
	    window.location = sokinput;
    } else if (sokinput.length > 0) {
	document.getElementById("sokinput").value = ""; //gör sökfältet tomt även när man går tillbaka
	window.location = "https://duckduckgo.com/?q=" + sokinput;
    }
}



//sökautocompletion med tab-------------------------------------------------------------
//bokmärken
var bookmarks = ["torrentday.com", "facebook.com", "kissanime.to/BookmarkList", "steampowered.com", "imdb.com", "prisjakt.nu", "hltv.org", "wiki.installgentoo.com", "4chan.org/wg", "4chan.org/w", "4chan.org/g", "myanimelist.net", "twitch.tv/following", "over.gg", "drive.google.com", "last.fm"];

//autofill
var i = 0;
var tab = false;
var initialSokinput;
function sokCompletion () {
    var sokinput = document.getElementById("sokinput");

    if (!tab) {
	initialSokinput = sokinput.value;
	tab = true;
    }

    for (i; i < bookmarks.length; i++) {
	if (initialSokinput === bookmarks[i].slice(0, initialSokinput.length)) {
	    sokinput.value = bookmarks[i];
	    break;
	}
    }
    i = i + 1;
    if (i > bookmarks.length) {
	sokinput.value = initialSokinput;
	i = 0; //nollställer i så att man kan gå flera varv med hjälp av tab-tryckningar
	tab = false;
    }
}

//tab keypress listener --- DONT TOUCH ME PLEASE
window.addEventListener("keydown", function (event) {
    var sokinput = document.getElementById("sokinput");
    if (event.defaultPrevented) {
    	return;
    }

    if (event.key === "Tab") {
	if (sokinput.value.length > 0) sokCompletion();
	focus();
    } else if (event.key === "Enter") {
	sok();
    } else {
	return;
    }

    if (event.key != "Backspace") event.preventDefault();
}, true);



//---positionen på bookmarks listan, sökfältet (och kanske klockan i framtiden.... but y tho?) LÄGG TILL LIKNANDE CSS FÖR ATT LADDNINGEN AV SIDAN INTE SKA SE HACKIG UT
setInterval(position, 100);
position();
function position() {
    document.getElementById("ul").style.top = ((window.innerHeight - document.getElementById("ul").offsetHeight) / 2).toString() + "px";
    document.getElementById("sokinput").style.top = ((window.innerHeight - document.getElementById("sokinput").offsetHeight) / 2).toString() + "px";
    document.getElementById("sokinput").style.left = ((window.innerWidth - document.getElementById("sokinput").offsetWidth) / 2).toString() + "px";
}


//---fullscreen
