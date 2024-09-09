document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('play-button');
    const ball = document.getElementById('ball');
    const leftBar = document.getElementById('left-bar');
    const rightBar = document.getElementById('right-bar');
    const playerScoreEle = document.getElementById('score-1');
    const compuerScoreEle = document.getElementById('score-2');
    let playerScore = 0, computerScore = 0, leftBarPos = 140, rightBarPos = 140;
    let intervalId;
    let ballPosition = {
        r: 200,
        c: 400,
    };
    let ballDirection = 'left';
    let dr = 10;
    let dc = -10;
    const boardWidth = 800, boardHeight = 400, barWidth = 10, barHeight = 60;

    document.addEventListener('keydown', moveBar);
    button.addEventListener('click', startGame);


    function isCollisionWithWall() {
        if (ballPosition.r > 390 | ballPosition.r < 0) {
            return true;
        }
    }

    function isCollisionWithBar() {
        if (ballPosition.r >= leftBarPos && ballPosition.r <= leftBarPos + barHeight && ballPosition.c <= barWidth) {
            return true;
        }
        if (ballPosition.r >= rightBarPos && ballPosition.r <= rightBarPos + barHeight && ballPosition.c >= boardWidth - barWidth) {
            return true;
        }
        return false;
    }
    function moveBall() {
        if (isCollisionWithWall()) {
            dr = -dr;
        }

        else if (isCollisionWithBar()) {
            if (ballPosition.r <= leftBar + barHeight / 2 || ballPosition.r <= rightBar + barHeight / 2) {
                dr = -10;
            }
            else {
                dr = 10;
            };
            if (ballPosition.c >= boardWidth - barWidth) compuerScoreEle.textContent = `${++computerScore}`;
            if (ballPosition.c <= barWidth) playerScoreEle.textContent = `${++playerScore}`;
            ballDirection = ballDirection === 'right' ? 'left' : 'right';
            dc = -dc;
        }
        ballPosition.r = ballPosition.r + dr;
        ballPosition.c = ballPosition.c + dc;
        ball.style.top = `${ballPosition.r}px`;
        ball.style.left = `${ballPosition.c}px`;
    }

    function startGame() {
        isGameStarted = true;
        button.style.display = 'none';
        drawBall();
        intervalId = setInterval(() => {
            if (!isCollisionWithBar() && (ballPosition.c <= barWidth || ballPosition.c >= boardWidth  - barWidth)) {
                clearInterval(intervalId);
                ballPosition.r = 200;
                ballPosition.c = 400;
                playerScore = 0;
                computerScore = 0;
                playerScoreEle.textContent = `${playerScore}`;
                compuerScoreEle.textContent = `${computerScore}`;
                startGame();
            }
            moveBall(), computerMovement();
        }, 40);
    }

    function computerMovement() {
        if (rightBarPos < ballPosition.r) rightBarPos += 10;
        else if (rightBarPos > ballPosition.r) rightBarPos -= 10;
        if (rightBarPos > 340) {
            rightBarDirection = 'up';
            return;
        }
        if (rightBarPos < 0) {
            rightBarDirection = 'down';
            return;
        }
        rightBar.style.top = `${rightBarPos}px`;
    }

    function drawBall() {
        ball.style.display = 'visible';
        ball.style.width = '15px';
        ball.style.height = '15px';
    }

    function moveBar(e) {
        const { code } = e;
        if (code === 'ArrowUp' && leftBarPos > 0) {
            leftBarPos -= 10;
        }
        else if (code === 'ArrowDown' && leftBarPos < boardHeight - barHeight) {
            leftBarPos += 10;
        }
        leftBar.style.top = `${leftBarPos}px`;
    }
});