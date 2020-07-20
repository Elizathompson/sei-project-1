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



  //execution 

  function selectShip() {
    console.log('ship selected')
  }

  function selectLocation() {
    console.log('ship goes here')
  }
  //event 


  ships.forEach(ship => {
    ship.addEventListener('click', selectShip)
  })

  // .forEach(ship => {
  //   ship.addEventListener('click', selectShip)
  // })





}


window.addEventListener('DOMContentLoaded', init)