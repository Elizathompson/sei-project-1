function init() {

  // * DOM elements 

  const grids = document.querySelectorAll('.grid')
  const cellsGrid = []
  const ships = document.querySelectorAll('.ship')
  const cellsShip = []
  // const playerGrid = document.querySelector('#player-grid')
  const resetButton = document.querySelector('.reset')


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

  // const compShips = {
  //   shipOne: [{ index: 1, hit: false }, { index: 2, hit: false }, { index: 3, hit: false }],
  //   shipTwo: [{ index: 10, hit: false }, { index: 11, hit: false }, { index: 12, hit: false }, { index: 13, hit: false }],
  //   shipThree: [{ index: 52, hit: false }, { index: 53, hit: false }, { index: 54, hit: false }, { index: 55, hit: false }],
  //   shipFour: [{ index: 60, hit: false }, { index: 61, hit: false }, { index: 62, hit: false }, { index: 63, hit: false }, { index: 64, hit: false }],
  //   shipFive: [{ index: 93, hit: false }, { index: 94, hit: false }, { index: 95, hit: false }, { index: 96, hit: false }, { index: 97, hit: false }, { index: 98, hit: false }, { index: 99, hit: false }]
  // }
  // console.log(compShips)
  
  function directionComputer() {
    const random = Math.random()
    return random >= 0.5
  }

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
  
  function shipCanFit(startPosition, size, direction) {
    if (direction) {
      const firstIndex = Math.floor(startPosition / width)
      const YAxisLimit = parseInt(width) - parseInt(size)
      return firstIndex <= YAxisLimit
    } else {
      const firstIndex = startPosition % width
      const XAxisLimit = parseInt(width) - parseInt(size)
      return firstIndex <= XAxisLimit - 1
    }
  }


  function getRandomPostion() {
    return Math.floor(Math.random() * cellCount)
  }


  function placeSingleShip(ship, startPosition, direction) {
    const indecies = []
    let incrementor = 1
    let compTargetLimit = 0
    if (direction){
      incrementor = 10
      compTargetLimit = startPosition + (10 * ship.size)
    } else {
      incrementor = 1
      compTargetLimit = startPosition + ship.size
    }
    for (let i = startPosition; i < compTargetLimit; i += incrementor) {
      const newPosition = i + incrementor
      const positionToLog = newPosition
      if (!isValidPosition(newPosition) || newPosition > cellCount) {
        return null
      }
      indecies.push({ index: positionToLog, isHit: false })
    }
    return indecies
  }


  function placeComputerShips(ship, direction) {
    
    const randomStartPosition = getRandomPostion()
    if ( 
      !isValidPosition(randomStartPosition)) {
      return placeComputerShips(ship, direction)
    }
    if (!shipCanFit(randomStartPosition, ship.size, direction)
    ) {
      return placeComputerShips(ship, direction)
    }
    const placedShip = placeSingleShip(ship, randomStartPosition, direction)
    if (!placedShip) {
      return placeComputerShips(ship, direction)
    }
    computerShips[ship.name] = placedShip
  }
  shipsToPlace.forEach((ship) => {
    const direction = directionComputer()
    placeComputerShips(ship, direction)
  } )
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
  
  let shipLength = 0

  function selectShip(e) {
    const shipCell = e.target
    const wholeShip = shipCell.parentElement
    if (wholeShip.classList.contains('selected')) {
      window.alert('Ship already placed - If you didn\'t actually place the ship, please reset 👍')
      shipLength = 0
      return
    } else {
      wholeShip.classList.add('selected')
      wholeShip.classList.add('removed')
      shipCell.classList.add('removed')
      shipLength = wholeShip.id
    }
  }

  function drawShip(targetIndex, targetLimit, targetCell, incrementor = 1) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      targetCell.classList.add('placedShip')
      playerCells[i].classList.add('placedShip')
      shipLength = 0
    }
  }


  let isValidNoOverLap = true
  function checkValidNoOverLap(targetIndex, targetLimit, incrementor) {
    for (let i = targetIndex; i < targetLimit; i += incrementor) {
      if (playerCells[i].classList.contains('placedShip')) {
        isValidNoOverLap = false
        return
      }
    }
  }


  let incrementor = 1
  let targetLimit = 0
  let value = 0

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
      window.alert('No ship selected')
    } else if (target.classList.contains('placedShip')) {
      window.alert('there is a ship here already')
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
        window.alert('This ship will not fit here 😬 Please try again 🙂')
        isValidNoOverLap = true
        return
      }
    }

    // console.log('this ship will not fit here')
  }
  



  // * ONCE ALL SHIPS ARE PLACED ATTACK INSTRUCTION / BUTTON APPEARS??

  // * PLAYER TURN 


  // first must select a cell on the computer grid
  // ! cells on the computer grid 
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
    })
  }

  let computerHits = 0
  function checkComputerWon() {
    if (computerHits >= 25) {
      return true 
    }
  }
  checkComputerWon()


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

  let timerId = null

  function playerAttack(e) {
    const targetIndex = parseInt(e.target.textContent)
    if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
      window.alert('You already shot here')
    } else {
      if (isShipHere(targetIndex)) {
        e.target.classList.add('hit')
        updateCompShips(targetIndex)
        if (!checkPlayerWon()){
          timerId = setTimeout(() => {
            computerAttack()
          }, 500)
        } else {
          window.alert('PLAYER WINS')
        }
      } else {
        e.target.classList.add('miss')
        timerId = setTimeout(() => {
          computerAttack()
        }, 500)
      }
    }
  }

  // * COMPUTER TURN 

  function createRandomAttack() {
    return Math.floor(Math.random() * 100)
  }

  function createSmartAttack() {
    return Math.floor(Math.random() * 4)
  }


  const smartHits = [10, -10, 1, -1]
  

  let lastShot = 'miss'
  let previousIndex = 0
  let previousSmartHit = 1


  function computerAttack() {
    // can I delay this two seconds?
    if (lastShot === 'miss') {
      const attackIndex = createRandomAttack()
      if (playerCells[attackIndex].classList.contains('hit') || playerCells[attackIndex].classList.contains('miss')) {
        computerAttack()
      } else {
        if (playerCells[attackIndex].classList.contains('placedShip')) {
          playerCells[attackIndex].classList.add('hit')
          computerHits = computerHits + 1
          lastShot = 'hit'
          previousIndex = attackIndex
          if (checkComputerWon()) {
            window.alert('COMPUTER WINS')
          } 
        } else {
          playerCells[attackIndex].classList.add('miss')
          lastShot = 'miss'
          previousIndex = attackIndex
        }
      } 
    } else if (lastShot === 'hit' ) {
      const smartHit = smartHits[createSmartAttack()] 
      const newAttack = previousIndex + smartHit 
      if (newAttack > 99 || newAttack < 0) {
        computerAttack()
      } else {
        if (playerCells[newAttack].classList.contains('hit') || playerCells[newAttack].classList.contains('miss')) {
          lastShot = 'miss'
          computerAttack()
        } else {
          if (playerCells[newAttack].classList.contains('placedShip')) {
            playerCells[newAttack].classList.add('hit')
            computerHits = computerHits + 1
            if (smartHit === 1 || smartHit === -1){
              lastShot = 'hitHorizontal'
              previousIndex = newAttack
              previousSmartHit = smartHit
              if (checkComputerWon()) {
                window.alert('COMPUTER WINS')
              } 
            } else if (smartHit === 10 || smartHit === -10) {
              lastShot = 'hitVertical'
              previousSmartHit = smartHit
              previousIndex = newAttack
              if (checkComputerWon()) {
                window.alert('COMPUTER WINS')
              } 
            }
            
          } else {
            playerCells[newAttack].classList.add('miss')
            lastShot = 'miss'
            previousIndex = newAttack
          }
        }
      }
    } else if ( lastShot === 'hitHorizontal' || lastShot === 'hitVertical' ) {
      const extraSmartHit = previousSmartHit 
      const newExtraSmartAttack = previousIndex + extraSmartHit
      if (newExtraSmartAttack < 99 && newExtraSmartAttack > 0) {
        if (playerCells[newExtraSmartAttack].classList.contains('hit') || playerCells[newExtraSmartAttack].classList.contains('miss')) {
          lastShot = 'miss'
          computerAttack()
        } else {
          if (playerCells[newExtraSmartAttack].classList.contains('placedShip')) {
            playerCells[newExtraSmartAttack].classList.add('hit')
            computerHits = computerHits + 1
            lastShot = 'hitHorizontal'
            previousIndex = newExtraSmartAttack
            if (checkComputerWon()) {
              window.alert('COMPUTER WINS')
            } 
          } else {
            playerCells[newExtraSmartAttack].classList.add('miss')
            lastShot = 'miss'
            previousIndex = newExtraSmartAttack
          }
        }
      } else {
        lastShot = 'miss'
        computerAttack()
      }
    }
  }


  function handleReset() {
    location.reload()
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
  resetButton.addEventListener('click', handleReset) 

}

window.addEventListener('DOMContentLoaded', init)