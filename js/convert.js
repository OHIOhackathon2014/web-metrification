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
		if(text[start].match("/^[0-9]+^.i+^,+^\s$/")) {
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
