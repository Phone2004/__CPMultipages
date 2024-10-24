//global constants 
const fieldWidth = 800
const fieldHeight = 500
const ballSize = 150

const maxX = fieldWidth - ballSize - 2
const maxY = fieldHeight - ballSize - 2

const vX = 7 // 45 deg (vX = vY)
const vY = 7

//global vars
let running = false //true->run, false->stop
let non = true
let basket = false
let footb = false
let volleyb = false
let human = false
let log = false


let goRight = true //true->right, false->left
let goDown = true //true->down, false->up

let x = 0
let y = 0

function runClick() {
    running = !running //true->false, false->true
    render()// force render
}

function bask() {
    basket = !basket
    render()
}

function foot() {
    footb = !footb
    render()
}

function volley() {
    volleyb = !volleyb
    render()
}

function hum() {
    human = !human
    render()
}

function logo() {
    log = !log
    render()
}

function none() {
    non = !non
    render()
}


// Add a variable to store the current spin angle
let spinAngle = 0;

// Add a variable to store the current spin speed
let spinSpeed = 0;

// Update the calculate function to change the spin speed and angle when the ball bounces

function calculate() {
    //move right direction
    if (goRight) {
        x = x + vX
        if (x >= maxX) {
            goRight = false
            spinSpeed = Math.random() * 15 - 5; // Random spin speed between -5 and 5
            
        }
    }

    //move left direction
    else {
        x = x - vX
        if (x <= 0) {
            goRight = true
            spinSpeed = Math.random() * 15 - 5; // Random spin speed between -5 and 5
            
        }
    }


    //move down direction
    if (goDown) {
        y = y + vY
        if (y >= maxY) {
            goDown = false
            spinSpeed = Math.random() * 15 - 5; // Random spin speed between -5 and 5
            
        }
    }

    //move up direction
    else {
        y = y - vY
        if (y <= 0) {
            goDown = true
            spinSpeed = Math.random() * 15 - 5; // Random spin speed between -5 and 5
            
        }
    }

    // Update the spin angle
    spinAngle += spinSpeed;
}

// Update the render function to apply the spin angle

function process() {
    if (running) {
        calculate()
        render()
    }
}

function render() {
    //render ball
    document.getElementById('ball').style.left = x + 'px'
    document.getElementById('ball').style.top = y + 'px'
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage; // Apply the current background image
    document.getElementById('ball').style.transform = `rotate(${spinAngle}deg)`; // Apply the spin angle
  
    //render run button
    const btnRun = document.getElementById('run')
    if (running) {
      document.getElementById('run').innerHTML = '<span class="bi bi-pause-fill">&nbspPAUSE</span>'
      document.getElementById('run').classList.remove('btn-success')
      document.getElementById('run').classList.add('btn-danger')
    } else {
      document.getElementById('run').innerHTML = '<span class="bi bi-play-fill">&nbspRUN</span>'
      document.getElementById('run').classList.remove('btn-danger')
      document.getElementById('run').classList.add('btn-success')
    }


  }

initial = () => {
    //setup field size
    document.getElementById('field').style.width = fieldWidth + 'px'
    document.getElementById('field').style.height = fieldHeight + 'px'

    //setup ball size
    document.getElementById('ball').style.width = ballSize + 'px'
    document.getElementById('ball').style.height = ballSize + 'px'
}

document.addEventListener('DOMContentLoaded', () => {
    //initial
    initial()

    document.addEventListener('keydown', checkKeyboard)

    // animation 25 f/s (duration = 1000ms / 25 = 40ms)
    setInterval(process, 40)
})

const checkKeyboard = (event) => {
    if (event.key === ' ') {
      runClick();
    } else if (event.key === '0') {
      noneClick();
    } else if (event.key === '1') {
      basketballClick();
    } else if (event.key === '2') {
      footballClick();
    } else if (event.key === '3') {
      volleyballClick();
    } else if (event.key === '4') {
      humanClick();
    } else if (event.key === '5') {
      cartoonClick();
    } else if (event.key === '6') {
      logoClick();
    }
}

// Add a variable to store the current background image
let currentBackgroundImage = '';

function basketballClick() {
    currentBackgroundImage = 'url(./img/basketball.png)';
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage;
    updateButtonStyles('basketball');
  }

  
function footballClick() {
    currentBackgroundImage = 'url(./img/football.png)';
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage;
    updateButtonStyles('football');
  }

  
function volleyballClick() {
    currentBackgroundImage = 'url(./img/volleyball.png)';
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage;
    updateButtonStyles('volleyball');
  }

  
function humanClick() {
    currentBackgroundImage = 'url(./img/human.png)';
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage;
    updateButtonStyles('human');
  }

  
function cartoonClick() {
    currentBackgroundImage = 'url(./img/cartoon.png)';
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage;
    updateButtonStyles('cartoon');
  }
  
function logoClick() {
    currentBackgroundImage = 'url(./img/logo.png)';
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage;
    updateButtonStyles('logo');
  }

  
function noneClick() {
    currentBackgroundImage = ''; // Reset the current background image
    document.getElementById('ball').style.backgroundImage = currentBackgroundImage; // Remove the background image
    updateButtonStyles('none');
  }

  
  // Function to update the button styles
  function updateButtonStyles(buttonId) {
    const buttons = ['basketball', 'football', 'volleyball', 'human', 'logo', 'none', 'cartoon'];
    buttons.forEach(button => {
      if (button === buttonId) {
        if (button === 'none') {
          document.getElementById(button).classList.remove('btn-outline-secondary');
          document.getElementById(button).classList.add('btn-secondary');
        } else {
          document.getElementById(button).classList.remove('btn-outline-primary');
          document.getElementById(button).classList.add('btn-primary');
        }
      } else {
        if (button === 'none') {
          document.getElementById(button).classList.remove('btn-secondary');
          document.getElementById(button).classList.add('btn-outline-secondary');
        } else {
          document.getElementById(button).classList.remove('btn-primary');
          document.getElementById(button).classList.add('btn-outline-primary');
        }
      }
    });
  }

// Update the render function to apply the current background image
