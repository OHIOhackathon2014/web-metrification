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
	[" mi\.","m",1609.34],
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
 
function AddOriginalMeasurement(x) {
	var text = document.createElement("TEXTAREA");
	text.id = "673ValueDIsplayerOfThePluginInExtension";
	text.innerHTML = "Original value: "+x;
	var event = event || window.event;
	text.style.position = "absolute";
	text.style.left = 0;//event.clientX;
	text.style.top = 0;//event.clientY;
	text.style.opacity = "0.5";
}

function RemoveOriginalMeasurement(x) {
	var element = document.getElementById("673ValueDIsplayerOfThePluginInExtension");
	element.parentNode.removeChild(element);
}

function adjust_unit(m_number, m_unit) {
	var m_unit_shift = 0;
	var offsets["","k","M","G","T","P","E","Z","Y"];
	var neg_offsets["","m","µ","n","p","f","a","z","y"];
	var m_adj_unit;
	
	while(m_number>1000 && m_unit_shift<8) {
	m_number/=1000;
	m_unit_shift++;
	}
	while(m_number<0 && m_unit_shift>-8) {
	m_number*=1000;
	m_unit_shift--;
	}
	
	if(m_unit_shift>0) {
	m_adj_unit = offsets[m_unit_shift] + m_unit;
	} else {
	m_adj_unit = neg_offsets[m_unit_shift] + m_unit;
	}
	
	return m_number+m_adj_unit;
}

function replaceUnit(s){
	var num,unitID,temp;
	unitID =0;
	console.log("RU 1");
	num = grab_number(s,0);
	console.log("RU 2: " + num);
	var convert = parseFloat(num);
	console.log("RU 3");
	for (var i = 0;i < conversion_list.length;i++) {
			temp =s.indexOf(conversion_list[i][0]);
			if(temp > 0){unitID = i;}
	}
	console.log("RU 4 : " + unitID);
	convert *= conversion_list[unitID][2];
	console.log("RU DONE");
	return " "+adjust_unit(convert+conversion_list[unitID][1])+" ";
}

function convert(text) {
	var impArray = imperial_array(text);
	var metricArray = metric_array(impArray);
	for (int i = 0; i < impArray.legnth; i++) {
		text = text.replace(impArray[i], metricArray[i]);
	}
	return text;
}

function imperial_array (text) {
	var regex = /\s[0-9]+[.]?[0-9]*\s(inch|inches|in|foot|feet|ft|yard|yd|mile|mi|teaspoon|tsp|tablespoon|tbsp|fluid\sounce|fl\soz|cup|pint|quart|gallon|ounce|oz|pound|lb|ton|fahrenheit|°f|mph|)[.]?\s/i;
	return text.match(regex);
}

function metric_array (impArray){
	var metricArray =  new Array(impArray.length);
	for (var i = 0; i < impArray.length; i++) {
		metricArray[i] = replace_unit(impArray[i]);
	}
	return metricArray;
}

//Run main html parser
console.log("Started");
try{
	var array = document.body.getElementsByTagName("*");
	var element;
	var length = array.length;
	for(var i=0; i<length;i++){
    		element = array[i];
			var node =  element.childNodes[0];
			while(node != null){
				if(node.nodeType == 3){
					//console.log("Checking node");
					node.textContent = convert(node.textContent);
				}
			node = node.nextSibling;
			}
	}
}
catch(err){
	console.log("EROR:" +err.toString());
}
console.log("Exiting");
