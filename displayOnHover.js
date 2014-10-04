function AddOriginalMeasurement(x) {
    var text = document.createElement("TEXTAREA");
    text.id = "673ValueDIsplayerOfThePluginInExtension";
    text.innerHTML = "Original value: "+x.original;
}

function RemoveOriginalMeasurement(x) {
    var element = document.getElementById("673ValueDIsplayerOfThePluginInExtension");
    element.parentNode.removeChild(element);
}
