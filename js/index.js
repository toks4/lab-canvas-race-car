const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')

const bgImg = new Image()
bgImg.src = './images/road.png'

const carImg = new Image()
carImg.src = './images/car.png'

const carWidth = 40
const carHeight = 80

let isMovingLeft = false
let isMovingRight = false

const carY = canvas.height - carHeight - 20
let carX = canvas.width / 2 - carWidth / 2

let animateId
let gameOver = false

let obstacles = []

const generateRandomNumber = () => {
  const randomObstaclX = Math.floor(100 + Math.random() * (canvas.width - 100))
  return randomObstaclX
}

class Obstacle {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = 'tomato'
    this.yPos += 2
    ctx.rect(this.xPos, this.yPos, this.width, this.height)
    ctx.fill()
    ctx.closePath()
  }

  checkCollision() {
    if (
      carX < this.xPos + this.width &&
      carX + carWidth > this.xPos &&
      carY < this.yPos + this.height &&
      carHeight + carY > this.yPos
    ) {
      gameOver = true
    }
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(carImg, carX, carY, carWidth, carHeight)

  obstacles.forEach(obstacle => {
    obstacle.checkCollision()
    obstacle.draw()
  })

  obstacles = obstacles.filter(obstacle => obstacle.yPos < canvas.height)

  if (isMovingLeft && carX > 60) {
    carX -= 5
  }
  if (isMovingRight && carX < canvas.width - 60 - carWidth) {
    carX += 5
  }

  if (animateId % 100 === 0) {
    obstacles.push(new Obstacle(generateRandomNumber(), -50, 50, 50))
  }
  /* if (animateId % 200 === 0) {
    carImg.src = 'https://miro.medium.com/max/800/0*WZbYCl-3V7l8lYrT.gif'
  } */
  console.log(obstacles)
  console.log(animateId)
  if (gameOver) {
    cancelAnimationFrame(animateId)
  } else {
    animateId = requestAnimationFrame(animate)
  }
}

const startGame = () => {
  document.querySelector('.game-intro').style.display = 'none'
  animate()
}

window.addEventListener('load', () => {
  document.getElementById('start-button').onclick = () => {
    startGame()
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 'ArrowRight') {
      isMovingRight = true
    }
    if (event.key === 'ArrowUp') {
      carImg.src = 'https://miro.medium.com/max/800/0*WZbYCl-3V7l8lYrT.gif'
    }
    if (event.key === 'ArrowDown') {
      carImg.src = '../images/car.png'
    }
  })

  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 'ArrowRight') {
      isMovingRight = false
    }
  })
})



















