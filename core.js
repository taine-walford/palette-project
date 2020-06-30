let globalDocument, 
    globalBody,
    paletteContainer,
    db
let currentPalette = [],
    cssVariables = {}

function handleAddClick () {
    console.log("proc >>> palette addition")
    if(document.getElementById("rgbString").value && document.getElementById("colourName").value) {
        addColour()
    }
}

function loadPalette () {
    db.collection("palette")
        .get()
        .then(snapshot => {
            currentPalette = []
            console.log("proc >>> query snapshot")
            snapshot.forEach(doc => {
                console.log(`proc >>> snapshot child ${doc.id.toLowerCase()}`)

                currentPalette.push(doc.data())
            });
            return renderColours()
        })
        .catch(err => {
        console.error("erro >>> loading collection ", err);
            })
}

function addColour () {
    let currentName = document.getElementById("colourName").value
    let currentHex = document.getElementById("hexCode").value
    let currentRGB = document.getElementById("rgbString").value
    let newColour = {
        colourName: currentName ? currentName : 'Null',
        hexCode: currentHex ? currentHex : rgbToHex(currentRGB),
        rgbString: currentRGB ? currentRGB : '0-0-0'
    }
    console.log("proc >>> adding colour to firebase")
    db.collection("palette")
        .add(newColour)
        .then(doc => {
            console.log(`proc >>> added child ${doc.id.toLowerCase()}`)
            currentPalette.push(newColour)
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
    let renderString = ''
    currentPalette.forEach(colourObject => {
        console.log(`proc >>> array child ${colourObject.colourName.toLowerCase()}`)
        console.log(`proc >>> adding child html to render batch`)
        renderString += colourHTMLTemplate(colourObject)
    })
    console.log(`rend >>> replacing palettecontainer with render batch`)
    document.getElementById('paletteContainer').innerHTML = renderString
    return renderString
}

function colourHTMLTemplate(colourObject) {
    return `
        <div class='colour-card'>
            <div class='left-side no-pad no-margin' style='background-color: ${colourObject.hexCode}'></div>
            <div class='right-side no-pad no-margin' style='background-color: ${colourObject.hexCode}'></div>
            <div class='hexagon-container'>
                <div class="hexagon" style='background-color: ${colourObject.hexCode}'><span></span></div>
            </div>
            <div class='card-details'>
                <p class='colour-title no-pad no-margin spaced' style='color: ${colourObject.hexCode}'>
                    ${colourObject.colourName}
                </p>
                <div class='horizontal-sep full-width' style='background-color: ${colourObject.hexCode}' ></div>
                <p class='colour-detail no-pad no-margin spaced' style='color: ${colourObject.hexCode}'>
                    ${colourObject.hexCode}
                </p>
                <p class='colour-detail no-pad no-margin spaced' style='color: ${colourObject.hexCode}'>
                    ${colourObject.rgbString}
                </p>
            </div>
        </div>
    `
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
    console.log(cssVariables)
    console.log("proc >>> loading collection from firebase")
    loadPalette()
}

console.log("load >>> html window")