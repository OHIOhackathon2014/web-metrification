var conversion_list = [["inch","m",0.0254],
                       ["inches","m",0.0254]
					   ["in","m",0.0254],
					   ["foot","m",0.3048],
					   ["feet","m",0.3048]
					   ["ft","m",0.3048],
					   ["yard","m",0.9144],
					   ["yd","m",0.9144]
					   ["mile","m",1609.34]
					   ["mi","m",1609.34]
					   
					   ["teaspoon","l",0.004929]
					   ["tsp","l",0.004929]
					   ["tablespoon","l",0.01479]
					   ["tbsp","l",0.01479]
					   ["fluid ounce","l",0.02957]
					   ["fl oz","l",0.02957]
					   ["cup","l",0.2366]
					   ["pint","l",0.4732]
					   ["quart","l",0.9464]
					   ["gallon","l",3.785]
					   
					   ["ounce","g",28.35]
					   ["oz","g",28.35]
					   ["pound","g",453.6]
					   ["lb","g",453.6]
					   ["ton","g",907185]
					   
					   ["farenheit","°c",""]
					   ["°f","°c",""]
					   
					   ["mph","kph",1.609]
					   ];

function replace_unit(String s) {
  //TODO format string
  
  double number = 0;
  String unit;
  double m_number = 0;
  string m_unit;
  
for(int i=0;i<s.length();i++) {
    if(39>=s.charCodeAt(i) && s.charCodeAt(i)>=30) {
//TODO add decimal support	
      unit*=10;
      unit+=charCodeAt(i)-30; // convert to int
    } else {
	//TODO add in punct/wht spc checking
      unit.append(s.charAt(i));
    }
	}
  for(int i=0;i<conversion_table.length();i++) {
    if(conversion_table.[i][0].equals(unit)) {
	  m_unit = conversion_table.[i][1];
	  m_number = number * conversion_table.[i][2];
	  i = conversion_table.length();
    }
  }

// unit fixing

return "<hover original=" + number + " " + unit + ">" + m_number + " " + m_unit + "</hover>"
}

/////////////////////////////////////////////Steve's convert
function convert (text) {
	var index = 0;
	do {
		var imperial = grab_imperial(text);
		if (imperial != -1) {
			var metric = replace_unit(imperial);
			text.replace(imperial, metric);
		}
	} while (imperial != -1);
}

function next_imperial (text) {
	var place_unit = new Array(2); // [0] = location of unit in text; [1] = unit that was found
	place_unit[0] = -1;
	place_unit[1] = 0;
	do {
		place_unit[0] = text.search(conversion_table[place_unit[1]][0]);
	} (while place_unit[0] == -1 && place_unit[1] < conversion_table.length);
	
	return place_unit;
}


function grab_number (text, start) {
	var value = "";
	text = text.split('');
	while (start > 0) {
		start--;
		if(text[start].match("/^[0-9]+^.+^,+^\s$/")) {
			value = text[start] + value;
		} else if (text[start].match("/^[a-zA-Z]$/")) {
			start = -1; //exit loop
		}
	}
	return value;
}

function grab_imperial (text) {
	var place_unit = next_imperial(text,start);
	var number = -1;
	var unit = "";
	if (place_unit[0] != -1 ) {
		number = grab_number(text, place_unit[0]);
		unit = conversion_table[place_unit[1]][0];
	}
	return number+unit;
}

//Run main html parser
var EntirePage = "";
try{
var array = document.body.getElementsByTagName("*");
var element;
var length = array.length;
for(var i=0; i<length;i++){
element = array[i];
var node =  element.childNodes[0];
while(node != null){
if(node.nodeType == 3){EntirePage += node.textContent; /*node.textContent = convert(node.textContent);*/}
node = node.nextSibling;
}
}

}
catch(err){
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