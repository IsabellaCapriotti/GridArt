grid = document.querySelector('.mainGrid'); 
drawEnabled = true; 

numRows = 16
numCols = 16

// Append divs to grid
function createGrid(numRows, numCols){

    for(let currRow = 1; currRow <= numRows ; currRow++){
        for(let currCol = 1; currCol <= numCols; currCol++){

            // Exclude bottom right 2 squares (needed for button)
            if(currRow == numRows && currCol >= numCols - 1){
                continue; 
            }

            // Create div
            const newGridDiv = document.createElement('div'); 
            newGridDiv.classList.add('gridSquare'); 
            newGridDiv.style.cssText = `grid-row: ${currRow} / ${currRow + 1}; grid-column: ${currCol} / ${currCol + 1}`; 

            // Add event listener to change color on mouse-over
            newGridDiv.addEventListener('mouseover', (e) => {
                
                if(drawEnabled){
                    r = Math.floor(Math.random() * 256); 
                    g = Math.floor(Math.random() * 256); 
                    b = Math.floor(Math.random() * 256); 

                    newGridDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`; 
                }
            });

            // Add event listener to toggle draw mode on click
            newGridDiv.addEventListener('click', (e) => {

                drawEnabled = !drawEnabled; 
                console.log(drawEnabled); 

            }); 
            
            grid.appendChild(newGridDiv); 

        }
    }

    createStartOverBtn(numRows, numCols); 

};

// Create "start over" button
function createStartOverBtn(numRows, numCols){
    const startOverBtn = document.createElement('button'); 
    startOverBtn.classList.add('resetBtn'); 
    startOverBtn.textContent = 'Start Over'
    startOverBtn.style.cssText = `grid-row: ${numRows} / ${numRows + 1}; grid-column: ${numCols - 1} / ${numCols + 1};`

    grid.appendChild(startOverBtn)

    startOverBtn.addEventListener('click', (e) => {

        newRowSize = prompt('Enter new number of grid rows: '); 

        if(newRowSize == null || newRowSize > 50 || newRowSize < 0){
            return; 
        }

        newColSize = prompt('Enter new number of grid columns: '); 

        if(newColSize == null || newColSize > 50 || newColSize < 0){
            return; 
        }

        numRows = newRowSize; 
        numCols = newColSize; 

        // Clear old grid
        gridChildren = Array.from(grid.children); 
        gridChildren.forEach( (child) => {
            console.log(child); 
            grid.remove(child); 
        })

        // Create new grid
        grid = document.createElement('div')
        grid.classList.add('mainGrid'); 
        grid.style.cssText = `grid-template-rows: repeat(${numRows}, 1fr); grid-template-columns: repeat(${numCols}, 1fr);`
        document.body.appendChild(grid); 

        createGrid(numRows, numCols); 

    }); 
}

// Draw original grid on page load
window.addEventListener('load', () => {
    createGrid(numRows, numCols);
})




