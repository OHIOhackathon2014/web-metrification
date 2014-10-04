//Run main html parser

try{
var array = document.body.getElementsByTagName("*");
var element;
var length = array.length;
for(var i=0; i<length;i++){
element = array[i];
var node =  element.childNodes[0];
while(node != null){
if(node.nodeType == 3){node.textContent = convert(node.textContent);}
node = node.nextSibling;
}
}

}
catch(err){
var oNewP = document.createElement("p");
var oText = document.createTextNode(err.message);
oNewP.appendChild(oText);
oNewP.style.fontSize = "xx-large";
document.body.appendChild(oNewP);
}

var NewP = document.createElement("p");
var Text = document.createTextNode("Done!");
NewP.appendChild(Text);
NewP.style.fontSize = "xx-large";
document.body.appendChild(NewP);