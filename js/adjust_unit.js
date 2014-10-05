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