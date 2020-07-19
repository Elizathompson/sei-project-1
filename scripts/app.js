function init() {

  // * DOM elements 

  const grids = document.querySelectorAll('.grid')
  const cellsGrid = []
  const ships = document.querySelectorAll('.ship')
  const cellsShip = []

  // * grid variables 

  const width = 10
  const cellCount = width * width 

  // * Creating the grids

  function createGrid() {
    grids.forEach(grid => {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
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
      for (let i = 0; i < 3; i++) {
        const cell = document.createElement('div')
        cell.textContent = i
        ship.appendChild(cell)
        cellsShip.push(cell)
      }
    })
  }

  createShips() 






}


window.addEventListener('DOMContentLoaded', init)