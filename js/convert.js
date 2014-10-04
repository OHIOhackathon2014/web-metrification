function convert (text) {
	document.write("64");
	var imperial = grab_imperial(text); 
	do { 
		if (imperial != -1) {
			var metric = replace_unit(imperial);
			text.replace(imperial, metric);
		}
		imperial = grab_imperial(text);
	} while (imperial != -1);
document.write("73");
	}

function grab_imperial (text) {
	var place_unit = next_imperial(text);
	var number = -1;
	var unit = "";
	document.write("80");
	if (place_unit[0] != -1 ) {
		number = grab_number(text, place_unit[0]);
		unit = conversion_list[place_unit[1]][0];
	}
	document.write("85");
	return number+unit;
}

function next_imperial (text) {
	var place_unit = new Array(2); // [0] = location of unit in text; [1] = unit that was found
	place_unit[0] = -1;
	place_unit[1] = 0;
	document.write("93");
	do {
		place_unit[0] = text.search(conversion_list[place_unit[1]][0]);//
		
	} while (place_unit[0] == -1 && place_unit[1] < conversion_list.length);
	document.write("98");
	return place_unit;
}

function grab_number (text, start) {
	var add = /\d|\.|,|\s/;
	var skip = /[a-zA-Z]/;
	var value = "";
	text = text.split('');
	document.write("105");
	while (start > 0) {
		start--;
		if(text[start].match(add) != null) {
			value = text[start] + value;
		} else if (text[start].match(skip) != null) {
			start = -1; //exit loop
		}
	}
	document.write("114");
	return value;
}
