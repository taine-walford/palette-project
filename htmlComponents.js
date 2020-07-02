
function isDark(actualObject){
    let rgbString = actualObject.rgbString
    let colourArray = rgbString.split('-')
    let colourObject = {
        r: colourArray[0],
        g: colourArray[1],
        b: colourArray[2],
    }
    let redValue = (Number(colourObject.r)/255)
    let greenValue = (Number(colourObject.g)/255)
    let blueValue = (Number(colourObject.b)/255)
    let darkness = 1 - ((redValue + greenValue + blueValue)/3);
    if(darkness < 0.5) return false;
    return true;
}

let components = {
    colourCard : (stoneIndex, colourObject) => {
        let cardElement = document.createElement('div')
            cardElement.id = 'card-' + stoneIndex
            cardElement.className = 'colour-card'
            cardElement.style.backgroundColor = `rgba(0,0,0, ${isDark(colourObject) ? 0.1 : 0.8}`
            let leftside = document.createElement('div')
                leftside.className = 'left-side no-pad no-margin'
                leftside.style.backgroundColor = colourObject.hexCode
            let rightside = document.createElement('div')
                rightside.className = 'right-side no-pad no-margin'
                rightside.style.backgroundColor = colourObject.hexCode
            let blockContainer = document.createElement('div')
                blockContainer.className = 'block-container no-pad no-margin'   
                let block = document.createElement('div')
                    block.className = 'block no-pad no-margin'
                    block.style.backgroundColor = colourObject.hexCode
                blockContainer.appendChild(block)
            let cardDetails = document.createElement('div')
                cardDetails.className = 'card-details'
                let cardTitle = document.createElement('p')
                    cardTitle.className='no-margin colour-title'
                    cardTitle.innerText = colourObject.colourName
                    cardTitle.style.color = colourObject.hexCode
                let hrSep = document.createElement('div')
                    hrSep.className = 'horizontal-sep full-width'
                    hrSep.style.backgroundColor = colourObject.hexCode
                let hexDetail = document.createElement('p')
                    hexDetail.className = 'no-pad no-margin spaced colour-detail'
                    hexDetail.style.color = colourObject.hexCode
                    hexDetail.innerText = colourObject.hexCode
                let rgbDetail = document.createElement('p')
                    rgbDetail.className = 'no-pad no-margin spaced colour-detail'
                    rgbDetail.style.color = colourObject.hexCode
                    rgbDetail.innerText = colourObject.rgbString
                cardDetails.appendChild(cardTitle)
                cardDetails.appendChild(hrSep)
                cardDetails.appendChild(hexDetail)
                cardDetails.appendChild(rgbDetail)
            cardElement.appendChild(leftside)
            cardElement.appendChild(rightside)
            cardElement.appendChild(blockContainer)
            cardElement.appendChild(cardDetails)
        return cardElement        
    //     <div style='background-color: rgba(0,0,0,${isDark(colourObject) ? 0.1 : 0.8}'>
    //         <div class='block-container no-pad no-margin'>
    //             <div class="block no-pad no-margin" style='background-color: ${colourObject.hexCode}'></div>
    //         </div>
    //         <div class='card-details'>
    //             <p class='no-margin colour-title' style='color: ${colourObject.hexCode}'>
    //                 ${colourObject.colourName}
    //             </p>
    //             <div class='horizontal-sep full-width' style='background-color: ${colourObject.hexCode}' ></div>
    //             <p class='no-pad no-margin spaced colour-detail' style='color: ${colourObject.hexCode}'>
    //                 ${colourObject.hexCode}
    //             </p>
    //             <p class='no-pad no-margin spaced colour-detail' style='color: ${colourObject.hexCode}'>
    //                 ${colourObject.rgbString}
    //             </p>
    //         </div>
    //     </div>
    },
    masonryColumn : (columnIndex, columnWidth, [spacingLeft, spacingRight]) => {
        let columnElement = document.createElement('div')
        columnElement.id = 'column-' + columnIndex
        columnElement.className = 'column-container'
        columnElement.style.width = columnWidth
        columnElement.style.marginLeft = spacingLeft
        columnElement.style.marginRight = spacingRight
        return columnElement
    }
}