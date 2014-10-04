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

