var bookmarks = [
"twitter.com",
"youtube.com/feed/subscriptions",
"torrentday.com",
"facebook.com",
"kissanime.to/BookmarkList",
"steampowered.com",
"imdb.com",
"prisjakt.nu",
"hltv.org",
"wiki.installgentoo.com",
"4chan.org/wg",
"4chan.org/w",
"4chan.org/g",
"myanimelist.net",
"twitch.tv/following",
"over.gg",
"drive.google.com",
"last.fm",
"teknik.io",
"messenger.com",
"wikipedia.org/wiki",
"reddit.com/r/globaloffensive",
"faceit.com",
"csgostash.com"
];


var input = document.getElementById("input");
document.getElementById("input").value = "";

//prevent focusing on anything else than input
window.onclick = getFocus;
function getFocus() {
  console.log("getFocus");
  input.focus();
}

function color() {
  if (input.value === "") {
    input.style.color = "#dddddd00";
    return;
  }
  var inputInclKey = input.value.toLowerCase();
  var length = inputInclKey.length;
  var uniqueMatch = 0;
  var halfMatch = false;
  var uniqueMatchUrl;
  for (var j = 0; j < bookmarks.length; j++) {
    if (inputInclKey === bookmarks[j].slice(0, length)) {
      uniqueMatch = uniqueMatch + 1; //equals one if it is a unique match, and equals more than one if it is not.
      halfMatch = true;
      //if (uniqueMatch === 1) uniqueMatchUrl = bookmarks[j]; //save the unique match's URL (for instantaneous navigation to the bookmark, without confirmation from the user (see line ~63))
    }
  }
  if (uniqueMatch === 1) {
    input.style.color = "#00ffff";
    //setTimeout(sok, 1000, uniqueMatchUrl);
    //sok(uniqueMatchUrl);
  } else if (halfMatch) {
    input.style.color = "#ff0000";
  } else {
    input.style.color = "#dddddd";
  }
}


//-------------COPY-PASTE-------------------

function sok(sokinput){
  var punkt = sokinput.includes(".");
  var space = sokinput.includes(" ");
  var url = sokinput.includes("://");

  if(punkt && !space && !url){
    document.getElementById("input").value = ""; //gör sökfältet tomt även när man går tillbaka
    window.location = "http://" + sokinput;
  } else if (url) {
    document.getElementById("input").value = "";
    window.location = sokinput;
  } else if (sokinput.length > 0) {
    document.getElementById("input").value = ""; //gör sökfältet tomt även när man går tillbaka
    window.location = "https://duckduckgo.com/?q=" + sokinput;
  }
}



//sökautocompletion med tab-------------------------------------------------------------
//bokmärken

//autofill
var i = 0;
var tab = false;
var initialSokinput;
function sokCompletion () {
  var uniqueSokCompletion = 0;
  var uniqueSokCompletionBookmark = 0;
  var sokinput = document.getElementById("input");

  if (!tab) {
    initialSokinput = sokinput.value.toLowerCase();
    tab = true;
  }

  for (var j = 0; j < bookmarks.length; j++) {
    if (initialSokinput === bookmarks[j].slice(0,initialSokinput.length)) {
      uniqueSokCompletion = uniqueSokCompletion + 1;
      uniqueSokCompletionBookmark = bookmarks[j];
    }
  }
  if (uniqueSokCompletion === 1) { //if sokCompletion is run and there is only one bookmark matching the input, navigation will initilize without the user having to press "Enter".
    sok(uniqueSokCompletionBookmark);
    return;
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
  setTimeout(color, 1);
  var sokinput = document.getElementById("input");

  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "Tab":
      if (sokinput.value.length > 0) {
        sokCompletion();
        event.preventDefault();
      }
      event.preventDefault();
      return;
      break;
    case "Enter":
      sok(input.value);
      return;
    case "Backspace":
      tab = false;
      if (input.value.length === 1) {
        document.getElementById("input").value = "";
        input.style.color = "#00000000";
      } else {
        initialSokinput = input.value.slice(0, input.value.length - 1);
        i = 0;
      }
      return;
    default:
      tab = false;
      return;
      //event.preventDefault();
  }
}, true);
