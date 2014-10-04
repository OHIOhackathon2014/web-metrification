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
					   ]

function replace_unit(String s) {
  //TODO format string
  
  var number = 0.0;
  var unit;
  var m_number = 0.0;
  var m_unit;
  
for(int i=0;i<s.length();i++) {
    if(39>=s.charCodeAt(i) && s.charCodeAt(i)>=30) {
//TODO add decimal support	
      unit*=10;
      unit+=charCodeAt(i)-30; // convert to int
    } else {
	//TODO add in punct/wht spc checking
      unit.append(s.charAt(i));
    }
  for(int i=0;i<conversion_table.length();i++) {
    if(conversion_table.[i][0].equals(unit)) {
	  m_unit = conversion_table.[i][1];
	  m_number = number * conversion_table.[i][2];
	  i = conversion_table.length();
    }
  }
  
// unit fixing

return "<hover original='" + number + " " + unit + "' onmouseover='AddOriginalMeasurement(this)' onmouseout='RemoveOriginalMeasurement(this)'>" + m_number + " " + m_unit + "</hover>"
}

