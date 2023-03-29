// create score board, add to body, and set initial score
const scoreBoard = document.createElement('div')
scoreBoard.classList.add('scoreBoard')
scoreBoard.innerText = '0'
document.body.append(scoreBoard)


// balloon array, will hold all balloons
const balloons = []
// create game canvas, add to body, and set width and height
const gameCanvas = document.createElement('div')
gameCanvas.classList.add('gameCanvas')
document.body.appendChild(gameCanvas)
const gameCanvasWidth = gameCanvas.offsetWidth // get width of game canvas
const gameCanvasHeight = gameCanvas.offsetHeight //  get height of game canvas





// Balloon class, create balloon, set random position and color, add to game canvas, and set speed
class Balloon {
    constructor() {
        this.balloonNode = document.createElement('div')
        this.balloonNode.classList.add('balloon')
        // set random position and color, add to game canvas, and set speed
        this.setRandomLeftPosition()
        this.setRandomColor()
        this.speed = Math.ceil(Math.random() * 10)
        // this.balloonNode.style.animationDuration = `${30 / this.speed}s`
        // pop up the balloon when clicked
        this.balloonNode.addEventListener('click', () => {
            // remove balloon from game canvas
            this.balloonNode.style.display = 'none'
            // then set new random position and color, and add to game canvas
            this.setRandomLeftPosition()
            this.setRandomColor()
            // take current score and add
            let currentScore = Number(scoreBoard.innerText)
            currentScore += this.speed // add speed to score
            this.balloonNode.style.display = 'block' // show balloon
            scoreBoard.innerText = currentScore // update score board

        })
    }
    setRandomLeftPosition() {
        this.balloonNode.style.left = `${Math.floor(Math.random() * gameCanvasWidth)}px`
    }
    setRandomColor() {
        this.balloonNode.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    }
    getCurrentBottom() {
        // get current bottom position of balloon, and return as number
        // console.log(this.balloonNode.style.bottom)
        return Number(this.balloonNode.style.bottom.split('px')[0])
    }
    lift() {
        // lift balloon up by speed
        const currentBottom = this.getCurrentBottom()
        if (currentBottom > gameCanvasHeight) {
            // if balloon is at bottom of game canvas, reset position 
            this.balloonNode.style.bottom = '0px'
        } else {
            // if balloon is not at bottom of game canvas, lift up by speed
            this.balloonNode.style.bottom = `${currentBottom + this.speed}px`
        }
    }

}

// create balloon, add to game canvas, and set speed, and add to balloons array
const balloonFragment = document.createDocumentFragment()
for (let i = 0; i < 10; i++) { // create 10 balloons
    const balloon = new Balloon()
    balloonFragment.append(balloon.balloonNode)
    balloons.push(balloon)
}
gameCanvas.append(balloonFragment)

// lift balloons up
function lifting() {
    gameCanvas.style.display = 'none'
    for (const balloon of balloons) {
        balloon.lift()
    }
    gameCanvas.style.display = 'block'
    // use requestAnimationFrame, so that the animation is smooth. 
    requestAnimationFrame(lifting)
}
lifting() // start lifting balloons up


