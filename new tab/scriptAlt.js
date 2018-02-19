//---KLOCKA---\\
setInterval(clock, 1000);
clock();
function clock() {
	var time = new Date();
	var timma = ("0" + time.getHours()).slice(-2);		//ser till att det alltid är 2 siffrigt. T ex 01:09:02 istället för 1:9:2
	var minut = ("0" + time.getMinutes()).slice(-2);
	document.getElementById("klocka").innerHTML = timma + ":" + minut;
};


//---SÖKBAR---\\
document.getElementById("sokinput").value = "";		//ser till att sökfältet är tomt även om man uppdaterar sidan

function sok(){
    var sokinput = document.getElementById("sokinput").value;
    var punkt = sokinput.includes(".");
    var space = sokinput.includes(" ");
    
    if(punkt && !space && sokinput.length > 2){
	window.location = "http://" + sokinput;
    } else if (sokinput.length > 0) {
	window.location = "https://duckduckgo.com/?q=" + sokinput;
    }
}

window.addEventListener("keydown", function (event) {		//---KOLLA UPP!!! KOMMENTARER KRÄVS!---\\
	if (event.defaultPrevented) {							//när enter trycks ner körs sok()
    	return; 
  }

	if (event.key === "Enter") {
		sok();
	} else {
		return;
	}

	event.preventDefault();
}, true);


//bg image

var bg = document.getElementById("bg");

var dim = 750;
/* UNCOMMENT TO COVER THE ENTIRE SCREEN
var dim;
if (window.innerHeight > window.innerWidth) {
    dim = window.innerWidth;
} else {
    dim = window.innerHeight;
}*/

bg.style.left = ((window.innerWidth - dim) / 2).toString() + "px";
bg.style.top = ((window.innerHeight - dim) / 2).toString() + "px";
bg.style.width = dim.toString() + "px";
