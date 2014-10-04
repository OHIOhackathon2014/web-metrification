function AddOriginalMeasurement(x) {
    var text = document.createElement("TEXTAREA");
    text.id = "673ValueDIsplayerOfThePluginInExtension";
    text.innerHTML = "Original value: "+x.original;
    var event = event || window.event;
    text.style.position = "absolute";
    text.style.left = event.clientX;
    text.style.top = event.clientY;
    text.style.opacity = "0.5";
}

function RemoveOriginalMeasurement(x) {
    var element = document.getElementById("673ValueDIsplayerOfThePluginInExtension");
    element.parentNode.removeChild(element);
}
