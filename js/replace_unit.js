var conversion_list = [["inch","m",0.0254],
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
document.write("37");
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