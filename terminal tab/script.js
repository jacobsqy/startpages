//defaults------------------------------------
function get (id) { //aka bae
    return document.getElementById(id);
}

var outputSpeed = 1; // x > 1. ---ibland saktar den ner p� refresh.. why?

get("input").value = ""; //reset input

window.onload = window.focus(); //autofocus

//bokm�rken
var bookmarks = ["torrentday.com", "facebook.com", "kissanime.to/BookmarkList", "steampowered.com", "imdb.com", "prisjakt.nu", "hltv.org", "wiki.installgentoo.com", "4chan.org/wg", "4chan.org/w", "4chan.org/g", "myanimelist.net", "twitch.tv/following", "over.gg", "drive.google.com", "twitter.com", "play.spotify.com", "youtube.com/feed/subscriptions", "sweclockers.com", "hjarntorget.goteborg.se"];
var bookmarksOutput = "";
for (var i = 0; i < bookmarks.length; i++) {
    bookmarksOutput = bookmarksOutput + bookmarks[i] + "<br>";
}

//output-----------------------------
var time = new Date();
var y = time.getUTCFullYear();
//Month
var M = time.getMonth();
switch (M) {
case 0:
    M = "Jan";
    break;
case 1:
    M = "Feb";
    break;
case 2:
    M = "Mar";
    break;
case 3:
    M = "Apr";
    break;
case 4:
    M = "May";
    break;
case 5:
    M = "Jun";
    break;
case 6:
    M = "Jul";
    break;
case 7:
    M = "Aug";
    break;
case 8:
    M = "Sep";
    break;
case 9:
    M = "Oct";
    break;
case 10:
    M = "Nov";
    break;
case 11:
    M = "Dec";
    break;
default:

}
var D = ("0" + time.getDate()).slice(-2);
//Day
var d = time.getDay();
if (d === 1) d = "Mon";
if (d === 2) d = "Tue";
if (d === 3) d = "Wed";
if (d === 4) d = "Thu";
if (d === 5) d = "Fri";
if (d === 6) d = "Sat";
if (d === 0) d = "Sun";
var h = ("0" + time.getHours()).slice(-2);
var m = ("0" + time.getMinutes()).slice(-2);
var s = ("0" + time.getSeconds()).slice(-2);

var date = d + " " + D + " " + M + " " + h + ":" + m + ":" + s + " " + y;
var textPre = get("output").innerHTML.slice(0, 76);
var textPost = get("output").innerHTML.slice(76);
var text = textPre + date + textPost + bookmarksOutput;
console.log(text);

//print-----------------------------------------------------------------------------
var textPos = 31;
print();

/* ---------------------gammla print()----------------------- */

function print() {
    while (textPos <= text.length) {
	//printa ut <span>sqy@startpage: ~ $</span> i ett k�r
	if (text.slice(textPos, textPos + 2) === "<s") {
	    textPos = textPos + 31;
	    get("output").innerHTML = text.slice(0, textPos);
	    setTimeout(print, outputSpeed);
	    break;
	} else if (text.slice(textPos, textPos + 1) === "&") { //skippa "&amp;" aka "&"-tecknet
	    textPos = textPos + 5;
	    get("output").innerHTML = text.slice(0, textPos);
	    setTimeout(print, outputSpeed);
	    break;
	} else if (text.slice(textPos, textPos + 2) === "<b") { //skippa <br>
	    textPos = textPos + 4;
	    get("output").innerHTML = text.slice(0, textPos);
	    setTimeout(print, outputSpeed);
	    break;
	} else {
	    get("output").innerHTML = text.slice(0, textPos);
	    textPos = textPos + 1;
	    setTimeout(print, outputSpeed);
	    break;
	}
    }
    if (textPos === text.length + 1) {
	get("label").style.display = "inline";
	get("input").focus();
	textPos = textPos + 1;
    }
}


/*---------------nya print()-----------------
var printCount = 0;
function print() {
  if (text.length === printCount) {
    get("label").style.display = "inline";
  	get("input").focus();
    return;
  } else {
    get("output").innerHTML = text.slice(0, printCount);
    printCount = printCount + 1;
  }
}
setInterval(print, 1);
*/

//S�KGREJER --- copypasta fr�n ../newtab/script.js----------------------------
window.onclick = fokus;
function fokus() {
    document.getElementById("input").focus();
}

function sok(){
    var sokinput = document.getElementById("input").value;
    var punkt = sokinput.includes(".");
    var space = sokinput.includes(" ");

    if(punkt && !space){
	document.getElementById("input").value = ""; //g�r s�kf�ltet tomt �ven n�r man g�r tillbaka
	window.location = "http://" + sokinput;
    } else if (sokinput.length > 0) {
	document.getElementById("input").value = ""; //g�r s�kf�ltet tomt �ven n�r man g�r tillbaka
	window.location = "https://duckduckgo.com/?q=" + sokinput;
    }
}

//s�kautocompletion med tab-------------------------------------------------------------


//autofill
var tabLoop = 0;
var tab = false;
var initialSokinput;
function sokCompletion () {
    var sokinput = document.getElementById("input");

    if (!tab) {
	initialSokinput = sokinput.value;
	tab = true;
    }

    for (tabLoop; tabLoop < bookmarks.length; tabLoop++) {
	if (initialSokinput === bookmarks[tabLoop].slice(0, initialSokinput.length)) {
	    sokinput.value = bookmarks[tabLoop];
	    break;
	}
    }
    tabLoop = tabLoop + 1;
    if (tabLoop > bookmarks.length) {
	sokinput.value = initialSokinput;
	tabLoop = 0; //nollst�ller i s� att man kan g� flera varv med hj�lp av tab-tryckningar
	tab = false;
    }
}

//tab keypress listener --- DONT TOUCH ME PLEASE
window.addEventListener("keydown", function (event) {
    var sokinput = document.getElementById("input");
    if (event.defaultPrevented) return;
    if (event.key === "Tab") {
	if (sokinput.value.length > 0) sokCompletion();
	fokus();
    } else if (event.key === "Enter") {
	sok();
    } else {
	return;
    }

    event.preventDefault();
}, true);


//STYLES
get("label").style.width = window.innerWidth + "px";


/*var text = "this should be printed out one character at a time";
function print() {
    while (i < text.length) {
	document.getElementById("output").innerHTML = text.slice(0, i);
	setTimeout(print, 1);
	break;
    }
}
print();*/


//input---- l�gg till en bild med hj�lp av "src='image.png'" (kanske inte funkar--- ska se ut som en fet mark�r, som i en terminal). och g�m mark�ren med "style='color: transparent'"
