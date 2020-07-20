function init() {

  // * DOM elements 

  const grids = document.querySelectorAll('.grid')
  const cellsGrid = []
  const ships = document.querySelectorAll('.ship')
  const cellsShip = []
  const playerGrid = document.querySelector('#player-grid')
  


  // * grid variables 

  const width = 10
  const cellCount = width * width 

  // * Creating the grids

  function createGrid() {
    grids.forEach(grid => {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.textContent = i
        grid.appendChild(cell)
        cellsGrid.push(cell)
      }
    })
  }

  createGrid()

  // * ship variables


  // * create ships 

  function createShips() {
    ships.forEach(ship => {
      const shipSize = ship.id
      for (let i = 0; i < shipSize; i++) {
        const cell = document.createElement('div')
        cell.classList.add('shipCell')
        cell.textContent = i
        ship.appendChild(cell)
        cellsShip.push(cell)
        const shipHeight = 30
        const shipWidth = shipHeight * shipSize 
        ship.style.width = shipWidth + 'px'
        ship.style.height = shipHeight + 'px'
      }
    })
  }
  // need to figure out how to get the ships to a good size - height wise?
  createShips() 

  // * placing ships 
  // ! first need to select the ships
  //element  
  // ? see ships above 
  //create playerCell class 
  const playerCells = document.querySelectorAll('#player-grid .cell')
  playerCells.forEach(cell => {
    cell.classList.add('playerCell')
  })
  



  //execution 

  // ! should select ship and ship placement be inside one funciton?!


  let shipLength = 0

  function selectShip(e) {
    const shipCell = e.target
    const wholeShip = shipCell.parentElement
    if (wholeShip.classList.contains('selected')) {
      console.log('ship already placed')
      window.shipLength = ''
      return
    } else {
      console.log('ship Selected')
      wholeShip.classList.add('selected')
      shipLength = wholeShip.id
    }

    // console.log(window.shipLength)
    //chnage color of the ship to show its been selected
    // store the id of the ship aka the number of squares to highlight in the grid 
    //make it so it cannot be selected again 
    //change colour to show it has been placed 
  }
  
  function drawShip(targetIndex, targetLimit, targetCell, incrementor = 1) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      console.log('ship goes here')
      targetCell.classList.add('placedShip')
      playerCells[i].classList.add('placedShip')
      shipLength = 0
    }
  } // drawShip(x, x, x, 11)

  let isValid = true
  function checkValid(targetIndex, targetLimit, incrementor = 1) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      if (playerCells[i].classList.contains('placedShip')) {
        console.log('this overlaps with another ship')
        isValid = false
        //SOME
      }
    }
  }




  function selectLocation(e) {
    const targetIndex = parseInt(e.target.textContent)
    const shipL = parseInt(shipLength)
    const targetLimit = targetIndex + shipL
    console.log(targetLimit)
    const xLimitWhereShipFits = parseInt(width) - parseInt(shipL)
    console.log(xLimitWhereShipFits)
    const xValue = targetIndex % width
    console.log(xValue)
    if (shipLength === 0) {
      console.log('No ship selected')
    } else if (e.target.classList.contains('placedShip')) {
      console.log('there is a ship here already')
      return 
      //if no shift key held 
    } else if ( xValue <= xLimitWhereShipFits){
      let isValid = true
      for (let i = targetIndex; i <   targetLimit; i++) {
        if (playerCells[i].classList.contains('placedShip')) {
          console.log('this overlaps with another ship')
          isValid = false
          return
          //SOME
        }
      }
      checkValid(targetIndex, targetLimit)
      if (isValid) {
        drawShip(targetIndex, targetLimit, e.target)
      } else {
        console.log('this ship will not fit here')
        isValid = true
        return
      }
    } else {
      console.log('this ship will not fit here')
    }
    // if shift key held -> places vertically
  }

  //select the square where the ship will go around 
  // add ship class to the surrounding squares the total of the ship id?

  //event 


  ships.forEach(ship => {
    ship.addEventListener('click', selectShip)
  })
  playerCells.forEach(cell => {
    cell.addEventListener('click', selectLocation)
  })

  // document.addEventListener('keydown', )


}


window.addEventListener('DOMContentLoaded', init)