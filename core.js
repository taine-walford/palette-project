let globalDoc, 
    globalBody

function addColour () {
    console.log("Add Button clicked")
}

window.onload = function() {
    globalDoc = document
    globalBody = document.getElementsByTagName('body')
    console.log("Body Loaded")
    globalDoc.getElementById("addButton").onclick = addColour
}

console.log("Script Loaded")