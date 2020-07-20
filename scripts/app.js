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

  function selectShip() {
    console.log('ship selected')
    //chnage color of the ship to show its been selected
    // store the id of the ship aka the number of squares to highlight in the grid 
    //make it so it cannot be selected again 
    //change colour to show it has been placed 
  }

  function selectLocation() {
    console.log('ship goes here')
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

  // .forEach(ship => {
  //   ship.addEventListener('click', selectShip)
  // })





}


window.addEventListener('DOMContentLoaded', init)