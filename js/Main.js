var conversion_list = [
	["inch","m",0.0254],
	["inches","m",0.0254],
	["in","m",0.0254],
	["foot","m",0.3048],
	["feet","m",0.3048],
	["ft","m",0.3048],
	["yard","m",0.9144],
	["yd","m",0.9144],
	["mile","m",1609.34],
	["mi","m",1609.34],
	["teaspoon","l",0.004929],
	["tsp","l",0.004929],
	["tablespoon","l",0.01479],
	["tbsp","l",0.01479],
	["fluid ounce","l",0.02957],
	["fl oz","l",0.02957],
	["cup","l",0.2366],
	["pint","l",0.4732],
	["quart","l",0.9464],
	["gallon","l",3.785],
	["ounce","g",28.35],
	["oz","g",28.35],
	["pound","g",453.6],
	["lb","g",453.6],
	["ton","g",907185],
	["fahrenheit","°c",""],
	["°f","°c",""],
	["mph","kph",1.609]
	];
 
function replace_unit(s) {
  //TODO format string
  var number = 0.0, unit = "", m_number = 0.0, m_unit = "", i = 0,i_start = 0, j = 0;
console.log("37");
for(i=0; i<s.length; i++) {
    if(57>=s.charCodeAt(i) && s.charCodeAt(i)>=48) {
//TODO add decimal support	
      number*=10.0;
      number+=s.charCodeAt(i)-48; // convert to int
    } else if(s.charCodeAt(i)==46) {
	  i_start = i;
	  while(++i<s.length && 57>=s.charCodeAt(i) && s.charCodeAt(i)>=48) {
	    number+=(Math.pow(0.1,i-i_start))*(s.charCodeAt(i)-48);
	  }
	} else {
	//TODO add in punct/wht spc checking
      unit.append(s.charAt(i));
    }

    console.log(chrome.extension.getViews());
    console.log("checkpoint 1: done finding decimal number");
}
	for(j=0; j<conversion_list.length; j++) {
    if(conversion_list[j][0].equals(unit)) {
	  m_unit = conversion_list[j][1];
	  m_number = number * conversion_list[j][2];
	  j = conversion_list.length;
    }
  }
  
// unit fixing

return "<hover original='" + number + " " + unit + "' onmouseover='AddOriginalMeasurement(this)' onmouseout='RemoveOriginalMeasurement(this)'>" + m_number + " " + m_unit + "</hover>";
}


/////////////////////////////////////////////Steve's convert
function convert (text) {
	console.log("64");
	var index = 0; // unused
	var imperial = grab_imperial(text); // i moved this
	do { //****
		//var imperial = grab_imperial(text); // Out of scope
		if (imperial != -1) {
			var metric = replace_unit(imperial);
			text.replace(imperial, metric);
		}
		imperial = grab_imperial(text); //  i did this
	} while (imperial != -1);
console.log("73");
	}

function grab_imperial (text) {
	var place_unit = next_imperial(text);
	var number = -1;
	var unit = "";
	console.log("80");
	if (place_unit[0] != -1 ) {
		number = grab_number(text, place_unit[0]);
		unit = conversion_list[place_unit[1]][0];
	}
	console.log("85");
	return number+unit;
}

function next_imperial (text) {
	var place_unit = new Array(2); // [0] = location of unit in text; [1] = unit that was found
	place_unit[0] = -1;
	place_unit[1] = 0;
	console.log("93");
	do {
		place_unit[0] = text.search(conversion_list[place_unit[1]][0]);//
		
	} while (place_unit[0] == -1 && place_unit[1] < conversion_list.length);
	console.log("98");
	return place_unit;
}

function grab_number (text, start) {
	var add = /\d|\.|,|\s/;
	var skip = /[a-zA-Z]/;
	var value = "";
	text = text.split('');
	console.log("105");
	while (start > 0) {
		start--;
		if(text[start].match(add) != null) {
			value = text[start] + value;
		} else if (text[start].match(skip) != null) {
			start = -1; //exit loop
		}
	}
	console.log("114");
	return value;
}


//Run main html parser
var EntirePage = "";
console.log("test");
alert("test");
console.log("Checkpoint 1: Started");
try{
	var array = document.body.getElementsByTagName("*");
	var element;
	var length = array.length;
	var i;
	console.log("checkpoint 2: before first loop");
	for(i=0; i<length;i++){
    		element = array[i];
    		var node =  element.childNodes[0];
		console.log("checkpoint 3: before subloop");
   		while(node != null){
			if(node.nodeType == 3){
				console.log("checkpoint 3.5: In if statement of subloop");
           			EntirePage += node.textContent; node.textContent = convert(node.textContent);
			}
		console.log("Checkpoint 4: Ending of inner loop");
		node = node.nextSibling;
		}
	console.log("checkpoint 5: inbetween loops");
	}
console.log("checkpoint 6: exiting loop hell");
}
catch(err){
	console.log("EROR");
	var oNewP = document.createElement("p");
	var oText = document.createTextNode(err.message);
	oNewP.appendChild(oText);
	oNewP.style.fontSize = "xx-large";
	document.body.appendChild(oNewP);
}

var NewP = document.createElement("p");
var Text = document.createTextNode(EntirePage);
NewP.appendChild(Text);
document.body.appendChild(NewP);
console.log("checkpoint 7: Exiting");


