function init() {

  // * DOM elements 

  const grids = document.querySelectorAll('.grid')
  const cellsGrid = []
  const ships = document.querySelectorAll('.ship')
  const cellsShip = []
  // const playerGrid = document.querySelector('#player-grid')



  // * GRID VARIABLES

  const width = 10
  const cellCount = width * width 

  // * CREATE THE TWO GRIDS:
  

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

  // * CREATE COMPUTER SHIPS 
  // const compShips = {
  //   shipOne: [{ index: 1, isHit: false },{index: 2, isHit: false }, {index: 3, isHit: false }],
  //   shipTwo: [] 
  // }
  
  // ! generate a random position on grid 0-99


  // function createNewRandomPosition() {
  //   const randomPosition = Math.floor(Math.random() * 100)
  //   return randomPosition
  // }
  
  // console.log(createNewRandomPosition())

  // ! generate random number to chose if V or H 
  // function directionComputer() {
  //   const random = Math.random()
  //   if (random >= 0.5) {
  //     return 'vertical'
  //   } else {
  //     return 'horizontal'
  //   }
  // }
  let randomStartPosition = 0
  function createRandomStartPostition() {
    return randomStartPosition = Math.floor(Math.random() * 100)
  }

  const computerShips = {}

  const shipsToPlace = [
    { name: 'shipOne', size: 3 },
    { name: 'shipTwo', size: 4 },
    { name: 'shipThree', size: 4 },
    { name: 'shipFour', size: 5 },
    { name: 'shipFive', size: 7 }
  ]
  function isValidPosition(startPosition) {
    return !Object.keys(computerShips).some(key => {
      return computerShips[key].includes(startPosition)
    })
  }
  function placeComputerShips() {
    shipsToPlace.forEach(shipToPlace => {
      // ? Using a while loop here to keep looking for a valid start position (one that no other ship is on)
      createRandomStartPostition()
      console.log(randomStartPosition)
      if (!isValidPosition(randomStartPosition)) {
        return placeComputerShips()
      }
      // ? An empty array to store the positions of each ship
      const indecies = []
      // ? Create the indexes from that random starting position (this is all horizontal for now), using a for loop
      indecies.push({ index: randomStartPosition, isHit: false }) // ? Start by pushing that random index to the start
      // ? then a for loop for the rest of the positions
      const isHorizontal = Math.random() > 0.5
      for (let i = 1; i < shipToPlace.size; i++) {
        const newPosition = isHorizontal ? randomStartPosition + i : randomStartPosition + (10 * i)
        if (!isValidPosition(newPosition) || newPosition > 99 ) {
          return placeComputerShips()
        }
        indecies.push({ index: randomStartPosition + i, isHit: false })
      }
      computerShips[shipToPlace.name] = indecies
    })
  }
  placeComputerShips()
  console.log(computerShips)

  // let isValidNoSpillOver = true 
  // function checkValidNoSpillOver(targetIndex, targetLimit, incrementor) {
  //   for (let i = targetIndex; i < targetLimit; i += incrementor) {
  //     if (playerCells[i].classList.contains('placedShip')) {
  //       console.log('this overlaps with another ship')
  //       isValidNoSpillOver = false
  //       return
  //     }
  //   }
  // }


  // * CREATE SHIPS TO PLACE 

  function generatePlayerShips() {
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
  generatePlayerShips() 


  // * LET PLAYER PLACE SHIPS: 

  // ? Player varibles -> cell classes:
  const playerCells = document.querySelectorAll('#player-grid .cell')
  playerCells.forEach(cell => {
    cell.classList.add('playerCell')
  })
  // console.log(playerCells)
  
  let shipLength = ''

  function selectShip(e) {
    const shipCell = e.target
    const wholeShip = shipCell.parentElement
    if (wholeShip.classList.contains('selected')) {
      console.log('ship already placed')
      shipLength = 0
      return
    } else {
      console.log('ship Selected')
      wholeShip.classList.add('selected')
      shipLength = wholeShip.id
    }
  }

  function drawShip(targetIndex, targetLimit, targetCell, incrementor = 1) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      console.log('ship goes here')
      targetCell.classList.add('placedShip')
      playerCells[i].classList.add('placedShip')
      shipLength = 0
    }
  }


  let isValidNoOverLap = true
  function checkValidNoOverLap(targetIndex, targetLimit, incrementor) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      if (playerCells[i].classList.contains('placedShip')) {
        console.log('this overlaps with another ship')
        isValidNoOverLap = false
        return
      }
    }
  }



  let incrementor = 1
  let targetLimit = ''
  let value = ''

  function selectLocation(e) {
    const target = e.target
    const targetIndex = parseInt(e.target.textContent)
    const shipL = parseInt(shipLength)
    const targetLimitX = targetIndex + shipL
    const targetLimitY = targetIndex + (10 * shipL)
    const axisLimitWhereShipFits = parseInt(width) - parseInt(shipL)
    const xValue = targetIndex % width
    const yValue = Math.floor(targetIndex / width)
    if (shipLength === 0) {
      console.log('No ship selected')
    } else if (target.classList.contains('placedShip')) {
      console.log('there is a ship here already')
      return 
    } else {
      if (e.shiftKey) {
        value = yValue
        incrementor = 10
        targetLimit = targetLimitY
      } else {
        value = xValue
        incrementor = 1
        targetLimit = targetLimitX
      }
      checkValidNoOverLap(targetIndex, targetLimit, incrementor)
      if (isValidNoOverLap  && value <= axisLimitWhereShipFits) {
        drawShip(targetIndex, targetLimit, e.target, incrementor)
      } else {
        console.log('this ship will not fit here')
        isValidNoOverLap = true
        return
      }
    }

    console.log('this ship will not fit here')
  }
  


  ships.forEach(ship => {
    ship.addEventListener('click', selectShip)
  })
  playerCells.forEach(cell => {
    cell.addEventListener('click', selectLocation)
  })

}


window.addEventListener('DOMContentLoaded', init)