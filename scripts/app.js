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

  function selectShip(e) {
    console.log('ship Selected')
    const shipCell = e.target
    const wholeShip = shipCell.parentElement
    wholeShip.classList.toggle('selected')
    const shipLength = wholeShip.id
    console.log(shipLength)
    //chnage color of the ship to show its been selected
    // store the id of the ship aka the number of squares to highlight in the grid 
    //make it so it cannot be selected again 
    //change colour to show it has been placed 
  }
  
  function selectLocation(e) {
    if (e.target.classList.contains('placedShip')) {
      console.log('there is a ship here already')
      return 
    } else {
      console.log('ship goes here')
      const targetCell = e.target
      targetCell.classList.add('placedShip')
      const targetIndex = e.target.textContent
      const shipLength = 3
      const targetLimit = parseInt(targetIndex) + parseInt(shipLength)
      console.log(targetLimit)
      for (let i = targetIndex; i < targetLimit; i++) {
        playerCells[i].classList.add('placedShip')
      }
    }

    

    //select the square where the ship will go around 
    // add ship class to the surrounding squares the total of the ship id?
  }
  //event 


  ships.forEach(ship => {
    ship.addEventListener('click', selectShip)
  })
  playerCells.forEach(cell => {
    cell.addEventListener('click', selectLocation)
  })




}


window.addEventListener('DOMContentLoaded', init)