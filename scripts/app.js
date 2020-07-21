function init() {

  // * DOM elements 

  const grids = document.querySelectorAll('.grid')
  const cellsGrid = []
  const ships = document.querySelectorAll('.ship')
  const cellsShip = []
  const playerGrid = document.querySelector('#player-grid')



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


  function createNewRandomPosition() {
    const randomPosition = Math.floor(Math.random() * 100)
    return randomPosition
  }
  
  console.log(createNewRandomPosition())

  // ! generate random number to chose if V or H 
  function directionComputer() {
    const random = Math.random()
    let direction = ''
    if (random >= 0.5) {
      direction = 'vertical'
    } else {
      direction = 'horizontal'
    }
    console.log(direction)
  }
  
  directionComputer()

  // ! object for ships to go into
  const compShips = {
    shipOne: [],
    shipTwo: [],
    shipThree: [],
    shipFour: [],
    shipFive: []
  }

  // ! -> need to form some kind of ship length
  const shipLengthForComp = [3, 4, 4, 5, 7]

  // 
  function generateCompShips() {
    for (let i = 0; i < shipLengthForComp.length - 1; i++){
      console.log('ship')
      const myNewRandomPosition = createNewRandomPosition()
      console.log(myNewRandomPosition)
      const direction = directionComputer()
      // for (shipz in compShips) {
      //   if(!shipz.includes(myNewRandomPosition))
      // }
      Object.keys(compShips).forEach(key => {
        if (!key.includes(myNewRandomPosition)) {
          const compShip = []
          for (let iterator = 0; iterator < shipLengthForComp[i]; iterator++) {
            compShip.push([
              (myNewRandomPosition + (direction === 'horizontal') ? iterator + 1 : iterator + 10)
            ])
          }
          console.log(compShip)
          if (shipLengthForComp[i] === shipLengthForComp[0]) {
            compShips.shipOne = compShip
          } else if (shipLengthForComp[i] === shipLengthForComp[1]) {
            compShips.shipTwo = compShip
          } else if (shipLengthForComp[i] === shipLengthForComp[2]) {
            compShips.shipThree = compShip
          } else if (shipLengthForComp[i] === shipLengthForComp[3]) {
            compShips.shipFour = compShip
          } else if (shipLengthForComp[i] === shipLengthForComp[4]) {
            compShips.shipFive = compShip
          } 
        } else {
          generateCompShips()
        }
      })
    }
  }
  generateCompShips()
  console.log(compShips)


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
  console.log(playerCells)
  
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

  let isValidNoSpillOver = true 
  function checkValidNoSpillOver(targetIndex, targetLimit, incrementor) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      if (playerCells[i].classList.contains('placedShip')) {
        console.log('this overlaps with another ship')
        isValidNoSpillOver = false
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
    console.log(targetLimitX)
    const targetLimitY = targetIndex + (10 * shipL)
    console.log(targetLimitY)
    const axisLimitWhereShipFits = parseInt(width) - parseInt(shipL)
    console.log(axisLimitWhereShipFits)
    const xValue = targetIndex % width
    console.log(xValue)
    const yValue = Math.floor(targetIndex / width)
    console.log(yValue)
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
      console.log(e.shiftKey)
      checkValidNoSpillOver(targetIndex, targetLimit, incrementor)
      checkValidNoOverLap(targetIndex, targetLimit, incrementor)
      if (isValidNoOverLap && isValidNoSpillOver && value <= axisLimitWhereShipFits) {
        drawShip(targetIndex, targetLimit, e.target, incrementor)
      } else {
        console.log('this ship will not fit here')
        isValidNoOverLap = true
        isValidNoSpillOver = true
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

  // document.addEventListener('keydown', selectLocation)


}


window.addEventListener('DOMContentLoaded', init)