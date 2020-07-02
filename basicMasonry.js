let componentTemplate, parentElement, stoneArray
let column = {number:0, width:0, elements : [], data: []}
let masonry = {
    intialise : (component, parent, inputArray) => { // intialise this script
        // init global variables using parameters
        componentTemplate = component
        parentElement = parent
        stoneArray = inputArray
        // get parent width
        let parentWidth = parentElement.clientWidth - 10 // scroll bar
        let columnWidth = 250
        // decide on column number, and then discern column width from remaining space
        column.number = Math.floor(parentWidth / (columnWidth + 20))
        let columnWidthSum = column.number * columnWidth
        let spacingWidthSum = parentWidth - columnWidthSum
        let spacingNumber = column.number + 1
        let spacingWidth = Math.floor(spacingWidthSum / spacingNumber)
        // update global dimension variables / return object of updates?
        //   >>> to-do
        // add column divs to parentElement
        let renderString = ''
        for(let columnIndex= 0; columnIndex< column.number; columnIndex++) {
            column.data.push([])
            let spacingArr
            if (column.number > 1) { // 1+ columns
                spacingArr = column == column.number - 1 
                    ? [spacingWidth, spacingWidth]
                    : [spacingWidth, 0]
            } else { // 1 column
                spacingArr = [spacingWidth, spacingWidth] 
            }
            let columnElement = components.masonryColumn(columnIndex, columnWidth, spacingArr)
            column.elements.push(columnElement)
            parentElement.appendChild(columnElement)
        }
        // iterate stoneArray, assigning a column to each
        console.log('call handleStones')
        stoneComponents = masonry.handleStones()
        // using component template, iterate through stoneArray and fill each template with data from the object
        // add the templates to the column divs
        return renderString
    },
    handleStones : (updateArray) => { // handle init/update of the stoneArray
        console.log(stoneArray)
        let columnIndex = 0
        let stoneElement
        if(updateArray) stoneArray = updateArray
        for(let stoneIndex = 0; stoneIndex < stoneArray.length - 1; stoneIndex++) {
            column.data[columnIndex] = stoneArray[stoneIndex]
            stoneElement = components.colourCard(stoneIndex, stoneArray[stoneIndex])
            column.elements[columnIndex].appendChild(stoneElement)

            console.log(column.number, columnIndex)            
            console.log(columnIndex +', ' + stoneArray[stoneIndex])

            columnIndex == column.number - 1 ? columnIndex = 0 : columnIndex++
        }
        return ''
    },
    handleResize : () => {

    },
    renderParent : () => { // replace the parentElements innerHTML with a string that contains x columns populated with components with input from ColumnData

    }
}