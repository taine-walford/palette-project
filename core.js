let globalDocument, 
    globalBody,
    paletteContainer,
    db
let inputArray = [],
    cssVariables = {}

function handleAddClick () {
    console.log("proc >>> palette addition")
    if(document.getElementById("colourName").value && (document.getElementById("rgbString").value || document.getElementById("hexCode").value)) {
        addColour()
    }
}

function loadPalette () {
    return db.collection("palette")
        .get()
        .then(snapshot => {
            inputArray = []
            console.log("proc >>> query snapshot")
            snapshot.forEach(doc => {
                console.log(`proc >>> snapshot child ${doc.id.toLowerCase()}`)

                inputArray.push(doc.data())
            });
            console.log(`rend >>> replacing palettecontainer with masonry load`)
            masonry.intialise(components.masonryColumn, paletteContainer, inputArray)
            console.log(`rend >>> replacing palettecontainer with masonry load`)
            return snapshot
        })
        .catch(err => {
            console.error("erro >>> loading collection | ", err);
        })
}

function addColour () {
    let currentName = document.getElementById("colourName").value
    let currentHex = document.getElementById("hexCode").value
    let currentRGB = document.getElementById("rgbString").value
    let newColour = {
        colourName: currentName ? currentName : 'Null',
        hexCode: currentHex ? currentHex : rgbToHex(currentRGB),
        rgbString: currentRGB ? currentRGB : hexToRGB(currentHex)
    }
    return db.collection("palette")
        .add(newColour)
        .then(doc => {
            console.log(`proc >>> added child ${doc.id.toLowerCase()}`)
            inputArray.push(newColour)
            renderColours()
            document.getElementById("colourName").value = ''
            document.getElementById("hexCode").value = ''
            document.getElementById("rgbString").value  = ''
            return ''
        })
        .catch(err => {
            console.error("erro >>> adding to collection ", err);
        })
}

function renderColours () {
    masonry.renderParent(inputArray)
}

function rgbToHex(rgbString) {
    console.log("proc >>> calculating hex string")
    let rgbArray = rgbString.split('-')
    let hexString = ''
    rgbArray.forEach( rgbNumber => {
        rgbNumber = Number(rgbNumber)
        let currentHex = Number(rgbNumber).toString(16)
        if (currentHex.length < 2)currentHex = "0" + currentHex
        hexString += currentHex
    })
    return '#' + hexString.toUpperCase()
}

function hexToRGB (hexString) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    let rgbObject = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : '000-000-000';
    let formattedObject = {
        r: pad(rgbObject.r),
        g: pad(rgbObject.g),
        b: pad(rgbObject.b),
    }
    return `${formattedObject.r}-${formattedObject.g}-${formattedObject.b}`
}

function pad(number) {
    var s = "000" + String(number);
    return s.substr(s.length - 3);
}

window.onload = function() {
    globalDocument = document
    globalBody = document.getElementsByTagName("body")
    console.log("init >>> firebase application")
    firebase.initializeApp({
        apiKey: window.location.search,
        authDomain: "palette-project-53771.firebaseapp.com",
        projectId: "palette-project-53771"
      });
    console.log("init >>> database variable")
    db = firebase.firestore();
    console.log("init >>> add button event listener")
    globalDocument.getElementById("addButton").onclick = handleAddClick
    paletteContainer = document.getElementById('paletteContainer')
    cssVariables.paletterContainerWidth = paletteContainer.clientWidth;
    console.log("proc >>> loading collection from firebase")
    loadPalette()
}

console.log("load >>> html window")