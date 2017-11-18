// Get the modal
var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


var data;
var question = document.getElementById("question");
var nquestion = document.getElementById("nquestion");
var reponse = document.getElementById("reponse");
var buttons = document.getElementsByClassName("rep");
var porcentage = 0;
var rId = 0;


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                data = JSON.parse(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}

function fin() {
    var result=document.getElementById("result");
    if (porcentage<40)
        result.innerHTML = "<section style='margin-top: 10%'> <div class='col-md-4' style=\"float: left;\"> <img src='images/super.png' width=200px></div><p class='col-md-8'> Ton asthme est sous contrôle ! <br/> Continue comme ça !!<br/></p></section>";
    else
        result.innerHTML = "<section style='margin-top: 10%'> <div class='col-md-4' style=\"float: left;\"> <img src='images/icone_medecin.png' width=200px> </div><p class='col-md-8'> Il est possible que ton asthme ne soit pas bien contrôlé !<br/> Va voir un pneumologue qui va te proposer de nouvelles solutions<br/> Cliquer <a href='https://www.doctolib.fr/pneumologue/?' id='search_pneumo' target='_blank' class='nav-link'>ici</a> pneumologues proches de chez moi</p></section>";
}

function data_imprim() {
	var qId = parseInt(nquestion.textContent);
	if(qId>0) qId = data[qId-1].next[rId];
	question.textContent = data[qId].question;
	reponse.textContent = "";
	for (var i = 0; i < data[qId].choices.length; i++) {
		var button = document.createElement("button");
		button.type="button";
		button.value=i;
		button.className="btn rep btn-default btn-block";
		button.textContent = data[qId].choices[i];
		reponse.appendChild(button);
	}
	nquestion.textContent = String(qId+1) ;
	buttons = document.getElementsByClassName("rep");
	for (var i = buttons.length - 1; i >= 0; i--) {
    	buttons[i].addEventListener("click",reponses)
    }
}

// When the user clicks on responses
function reponses() {
	rId = this.value;
    var qId = parseInt(nquestion.textContent);
    porcentage+=data[qId-1].points[rId];
    circle(data[qId-1].points[rId]);
    if (qId>=data.length) {
    	fin();
	}
    else{
    	data_imprim();
    }
}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/

window.onload = function() {
    modal.style.display = "block";
    if(typeof variable === 'undefined')
    	readTextFile('data/fatalite.json');
    else if (search_keywords.length==0) 
    	readTextFile('data/fatalite.json');
    else 
    	readTextFile('data/effet_cortico.json')
    data_imprim();
    circle(0);
    
}