const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        countdown: 60,
        lives: 3,

    }
}

function randomSquare() {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.square[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
    countdown()
}

function countdown() {
    state.values.countdown--
    if (state.values.countdown <= 0) {
        playSound("game-over")
        sleep(500).then(() => {
            state.values.countdown = 60
            alert(`Game over! O seu resultado foi ${state.values.result}`)
            state.values.score = 0
            state.values.lives = 3
        });
        
    }
    state.view.timeLeft.textContent = state.values.countdown
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)

}



function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }
        })
    })

}

function playSound(audioName) {
    let audio = new Audio(`./src/audio/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play();
}


function init() {

    moveEnemy()
    addListenerHitBox();
}

init()