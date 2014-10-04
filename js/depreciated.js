
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