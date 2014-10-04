var conversion_list = [
	[" inch","m",0.0254],
	[" inches","m",0.0254],
	[" in.","m",0.0254],
	[" foot","m",0.3048],
	[" feet","m",0.3048],
	[" ft","m",0.3048],
	[" yard","m",0.9144],
	[" yd","m",0.9144],
	[" mile","m",1609.34],
	[" mi.","m",1609.34],
	[" teaspoon","l",0.004929],
	[" tsp","l",0.004929],
	[" tablespoon","l",0.01479],
	[" tbsp","l",0.01479],
	[" fluid ounce","l",0.02957],
	[" fl oz","l",0.02957],
	[" cup","l",0.2366],
	[" pint","l",0.4732],
	[" quart","l",0.9464],
	[" gallon","l",3.785],
	[" ounce","g",28.35],
	[" oz","g",28.35],
	[" pound","g",453.6],
	[" lb","g",453.6],
	[" ton","g",907185],
	[" fahrenheit","°c",""],
	["°f","°c",""],
	[" mph","kph",1.609]
	];
 
 function grab_number (text, start) {
	var add = /[0-9]|[.]|,|\s/;
	var value = "";
	text = text.split('');
	console.log("105");
	while (start > 0) {
		start--;
	console.log(text[start].match(add) != null);
		if(text[start].match(add) != null) {
			value = text[start] + value;
		} else  {
			start = -1; //exit loop
		}
	}
	if(value.length = 0){value = "0";}
	console.log("grab_number value: "+ value);
	return value;
}

 
function replace_unit(s) {
  //TODO format string
  s = s.trim();
  s = s.toLowerCase();
  var number = 0.0, unit = "", m_number = 0.0, m_unit = "", i = 0,i_start = 0, j = 0;
  var is_negative = false;
console.log("37");
for(i=0; i<s.length; i++) {
	console.log("40");
    if(57>=s.charCodeAt(i) && s.charCodeAt(i)>=48) {
//TODO add decimal support	
	  console.log("44");
      number*=10.0;
      number+=s.charCodeAt(i)-48; // convert to int

    } else if(s.charCodeAt(i)==46) {
	console.log("48");
	  i_start = i;
	  while(++i<s.length && 57>=s.charCodeAt(i) && s.charCodeAt(i)>=48) {

	    number+=(Math.pow(0.1,i-i_start))*(s.charCodeAt(i)-48);
		console.log("48");
	}
  } else if(s.charCodeAt(i)==45) {
	  console.log("55");
	  is_negative = true;
	} else if(s.charAt(i)!= null){
	//TODO add in punct/wht spc checking
	console.log("59");
    unit += s.charAt(i);
    }

    //console.log(chrome.extension.getViews());
    console.log("checkpoint 1: done finding decimal number");
}

	for(j=0; j<conversion_list.length; j++) {
    if(conversion_list[j][0]==(unit)) {
	  m_unit = conversion_list[j][1];
	  m_number = number * conversion_list[j][2];
	  j = conversion_list.length;
    }
  }
 console.log("66");
  if(unit == "°f" || unit=="fahrenheit"){return replace_temp_unit(s);}
// unit fixing
if(is_negative){m_number*=-1;}
return "<hover original='" + number + " " + unit + "' onmouseover='AddOriginalMeasurement(this)' onmouseout='RemoveOriginalMeasurement(this)'>" + m_number + " " + m_unit + "</hover>";
}

function replace_temp_unit(s) {
var number = 0.0, unit = "", m_number = 0.0, m_unit = ""
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
      unit+=(s.charAt(i));
    }
	}
	if(unit == "°f" || unit=="fahrenheit") {
	m_unit = "°c"
	m_number = (number-32)*(5.0/9.0);
	} else {
	return "";
	}
	
return "<hover original='" + number + " " + unit + "' onmouseover='AddOriginalMeasurement(this)' onmouseout='RemoveOriginalMeasurement(this)'>" + m_number + " " + m_unit + "</hover>";
}

function replaceUnitBebo(s){
var num,unitID,temp;
unitID =0;
console.log("RU 1");
num = grab_number(s,0);
console.log("RU 2");
var convert = parseFloat(num);
console.log("RU 3");
for (var i = 0;i < conversion_list.length;i++) {
		temp =s.search(conversion_list[i][0]);
		if(temp > 0){unitID = i;}
}
console.log("RU 4 : " + unitID);
convert *= conversion_list[unitID][2];
console.log("RU DONE");
return ""+convert+conversion_list[unitID][1];
}

/////////////////////////////////////////////Steve's convert
function convert (text) {
var nextUnit = next_unit_index(text);
while (nextUnit[0] > 0) {
	console.log("Got unit at index " + nextUnit[0]);
		var imperialStr = grab_number(text,nextUnit[0])+conversion_list[nextUnit[1]][0];
		console.log("Got total imperial value "+ imperialStr);
		var metric = replaceUnitBebo(imperialStr);
		console.log("Unit replaced with metric val " + metric);
		var front = text.substring(0, nextUnit[0]);
		var back = text.substring(nextUnit[0]+imperialStr.length+1,text.length);
		text = front + metric + back;
		console.log("***** UNIT REPlACED ***** \"" + imperialStr + "\" \"" + metric + "\"");
		nextUnit = next_unit_index(text);
}
console.log("***** FINISHED CONVERTING *****");
return text;
}

function next_unit_index (text) {
	var place_unit = new Array(2); // [0] = location of unit in text; [1] = unit that was found
	place_unit[0] = -1;
	place_unit[1] = 0;
//	console.log("93");
	while (place_unit[0] == -1 && place_unit[1] < conversion_list.length) {
		place_unit[0] = text.search(conversion_list[place_unit[1]][0]);//
		place_unit[1]++;
	}
	place_unit[1]--;
	console.log(place_unit[1] + " " + place_unit[0]);
	return place_unit;
}



//Run main html parser
console.log("Checkpoint 1: Started");
try{
	var array = document.body.getElementsByTagName("*");
	var element;
	var length = array.length;
//	console.log("checkpoint 2: before first loop");
	for(var i=0; i<length;i++){
    		element = array[i];
			var node =  element.childNodes[0];
			while(node != null){
				if(node.nodeType == 3){
//					console.log("checkpoint 3.5: In if statement of subloop");
					node.textContent = convert(node.textContent);
				}
			node = node.nextSibling;
			}
	}
console.log("checkpoint 6: exiting loop hell");
}
catch(err){
	console.log("EROR:" +err.toString());
}
console.log("checkpoint 7: Exiting");
