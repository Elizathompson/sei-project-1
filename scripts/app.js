function init() {

  // * DOM elements 

  const grids = document.querySelectorAll('.grid')
  const cellsGrid = []
  const ships = document.querySelectorAll('.ship')
  const cellsShip = []
  // const playerGrid = document.querySelector('#player-grid')

  // const resetButton = document.querySelector('.reset')



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

  // ! generate random number to chose if V or H 
  // function directionComputer() {
  //   const random = Math.random()
  //   if (random >= 0.5) {
  //     return 'vertical'
  //   } else {
  //     return 'horizontal'
  //   }
  // }

  // const compShips = {
  //   shipOne: [{ index: 1, hit: false }, { index: 2, hit: false }, { index: 3, hit: false }],
  //   shipTwo: [{ index: 10, hit: false }, { index: 11, hit: false }, { index: 12, hit: false }, { index: 13, hit: false }],
  //   shipThree: [{ index: 52, hit: false }, { index: 53, hit: false }, { index: 54, hit: false }, { index: 55, hit: false }],
  //   shipFour: [{ index: 60, hit: false }, { index: 61, hit: false }, { index: 62, hit: false }, { index: 63, hit: false }, { index: 64, hit: false }],
  //   shipFive: [{ index: 93, hit: false }, { index: 94, hit: false }, { index: 95, hit: false }, { index: 96, hit: false }, { index: 97, hit: false }, { index: 98, hit: false }, { index: 99, hit: false }]
  // }
  // console.log(compShips)

  const computerShips = {}

  const shipsToPlace = [
    { name: 'shipOne', size: 3 },
    { name: 'shipTwo', size: 4 },
    { name: 'shipThree', size: 5 },
    { name: 'shipFour', size: 6 },
    { name: 'shipFive', size: 7 }
  ]
  function isValidPosition(startPosition) {
    return !Object.keys(computerShips).some(key => {
      return computerShips[key].some(positon => {
        return positon.index === startPosition
      })
    })
  }
  function shipCanFit(startPosition, size) {
    const firstIndex = startPosition % width
    const finalIndex = (startPosition + (size - 1)) % width
    return finalIndex > firstIndex
  }
  function getRandomPostion() {
    return Math.floor(Math.random() * cellCount)
  }
  function placeSingleShip(ship, startPostion) {
    const indecies = []
    for (let i = 0; i < ship.size; i++) {
      const newPosition = startPostion + i
      if (!isValidPosition(newPosition) || newPosition > cellCount) {
        return null
      }
      indecies.push({ index: startPostion + i, isHit: false })
    }
    return indecies
  }
  function placeComputerShips(ship) {
    const randomStartPosition = getRandomPostion()
    if (
      !isValidPosition(randomStartPosition) ||
      !shipCanFit(randomStartPosition, ship.size)
    ) {
      return placeComputerShips(ship)
    }
    const placedShip = placeSingleShip(ship, randomStartPosition)
    if (!placedShip) {
      return placeComputerShips(ship)
    }
    computerShips[ship.name] = placedShip
  }
  shipsToPlace.forEach(placeComputerShips)
  console.log(computerShips)

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
  



  // * ONCE ALL SHIPS ARE PLACED ATTACK BUTTON APPEARS 



  // * PLAYER TURN 




  // first must select a cell on the computer grid
  // ! celss on the computer grid 
  const computerCells = document.querySelectorAll('#computer-grid .cell')
  computerCells.forEach(cell => {
    cell.classList.add('computerCell')
  })



  // ! NEED TO SET THIS UP SO IT ONLY WORKS ONCE ALL THE SHIPS ARE PLACED 

  function checkPlayerWon() {
    return Object.keys(computerShips).every(key => {
      return computerShips[key].every(positon => {
        return positon.isHit === true
      })
      // or have a number counting up to the top everytime there is a hit
    })
  }

  function checkComputerWon() {
    // does ever div with class 'ship' also have class 'hit' on the
    const ships = document.querySelectorAll('.placedShip')
    console.log(ships)
    const allHaveClassHit = ships.every(ship => {
      ship.classList.contains('hit')
    })
    console.log(allHaveClassHit)
    return allHaveClassHit 
  }


  function isShipHere(targetIndex) {
    return Object.keys(computerShips).some(key => {
      return computerShips[key].some(positon => {
        return positon.index === targetIndex
      })
    })
  }

  function updateCompShips(targetIndex) {
    Object.keys(computerShips).forEach(ship => {
      computerShips[ship] = computerShips[ship].map(item => {
        if (item.index !== targetIndex) {
          return item
        }
        return { index: targetIndex, isHit: true }
      })
    })
    console.log(computerShips)
  }

  function playerAttack(e) {
    console.log('player attack')
    const targetIndex = parseInt(e.target.textContent)
    if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
      console.log('You already shot here')
    } else {
      if (isShipHere(targetIndex)) {
        e.target.classList.add('hit')
        updateCompShips(targetIndex)
        if (!checkPlayerWon()){
          computerAttack()
        } else {
          console.log('PLAYER WINS')
        }
      } else {
        e.target.classList.add('miss')
        computerAttack()
      }
    }
  }

  // * COMPUTER TURN 

  function createRandomAttack() {
    return Math.floor(Math.random() * 100)
  }

  function computerAttack() {
    // can I delay this two seconds?
    console.log('computer attack')
    const attackIndex = createRandomAttack()
    console.log(playerCells[attackIndex])
    if (playerCells[attackIndex].classList.contains('hit') || playerCells[attackIndex].classList.contains('miss')) {
      computerAttack()
    } else {
      if (playerCells[attackIndex].classList.contains('placedShip')) {
        playerCells[attackIndex].classList.add('hit')
        if (checkComputerWon()) {
          console.log('COMPUTER WINS')
        } else {
          console.log('computer hit')
        }
      } else {
        playerCells[attackIndex].classList.add('miss')
      }
    }
  }


  ships.forEach(ship => {
    ship.addEventListener('click', selectShip)
  })

  playerCells.forEach(cell => {
    cell.addEventListener('click', selectLocation)
  })

  computerCells.forEach(cell => {
    cell.addEventListener('click', playerAttack)
  })

  // const startButton = document.querySelector('.start')
  // console.log(startButton)
  // startButton.addEventListener('click', computerAttack)
} 

window.addEventListener('DOMContentLoaded', init)