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
	[" mi","m",1609.34],
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
	[" fahrenheit","°c",1],
	["°f","°c",1],
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
	var offsets = ["","k","M","G","T","P","E","Z","Y"];
	var neg_offsets = ["","m","µ","n","p","f","a","z","y"];
	var m_adj_unit;
	
	if(m_unit == "°c") {
		m_number = (m_number-32)*(5.0/9.0);
		m_adj_unit = m_unit;
	} else {
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
	}
	return m_number + " " + m_adj_unit;
}

function replace_unit(s){
	s = s.trim();
	var impNum = parseFloat(s.substring(0, s.search("/s")));
	var impUnit = s.substring(s.search("/s")).trim();
	var metricNum;
	var metricUnit;

	for (var i = 0; i < conversion_list.length; i++) {
		if (conversion_list[i][0] == impUnit) {
			metricUnit = conversion_list[i][1];
			metricNum = impNum * conversion_list[i][2];
			break;
		}
	}
	return "<b  style=\"color:green\"  onmouseover=\"AddOriginalMeasurement(this)\" onmouseout=\"RemoveOriginalMeasurement(this)\">" + adjust_unit(metricNum, metricUnit) + "</b>";
}

function imperial_array (text) {
	var regex = /[0-9]+[.]?[0-9]*\s(inch|inches|in|foot|feet|ft|yard|yd|mile|mi|teaspoon|tsp|tablespoon|tbsp|fluid\sounce|fl\soz|cup|pint|quart|gallon|ounce|oz|pound|lb|ton|fahrenheit|°f|mph)[.]?[^a-zA-Z0-9]/i;
	return text.match(regex);
}

function metric_array (impArray){
	var metricArray =  new Array(impArray.length);
	for (var i = 0; i < impArray.length; i++) {
		metricArray[i] = replace_unit(impArray[i]);
	}
	
	console.log("105: " + metricArray);
	return metricArray;
}

//Run main html parser
console.log("Started");

	var array = document.body.getElementsByTagName("*");
	var element;
	console.log("119: " + array.length);
	var length = array.length;
	for(var i=0; i<length;i++){
    	element = array[i];
		var node =  element.childNodes[0];
		var impArray;		
		var metricArray;
		while(node != null){
			if(node.nodeType == 3 && node.textContent != null){ //Node type 3 is text
				var text = node.textContent;
				impArray = imperial_array(text);
				console.log("95: " + impArray);
				if (impArray!=null) {
					metricArray = metric_array(impArray);
					console.log("98: " + metricArray);
				}
			}
			node = node.nextSibling;
		}
		//
		//console.log("102: met array : " + metricArray.length);
		if(impArray != null){
		console.log("REALLY WRITING REAL THINGS REALLY" + impArray.length);
		for (var j = 0; j < impArray.length; j++) {
		element.innerHTML = element.innerHTML.replace(impArray[j],metricArray[j]);}
		}
	}

console.log("Exiting");
