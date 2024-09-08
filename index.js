document.addEventListener('DOMContentLoaded', () => {


    const width = 800;
    const height = 400;
    const button = document.getElementById('play-button');
    const ball = document.getElementById('ball');
    const leftBar = document.getElementById('left-bar');
    const rightBar = document.getElementById('right-bar');
    let currentBarPos = 140;
    let intervalId;
    let rightBarPos = 140;
    let ballPosition = {
        r: 200,
        c: 400,
    };
    let ballDirection = 'left';
    let dr = 10;
    let dc = -10;
    document.addEventListener('keydown', moveBar);
    button.addEventListener('click', startGame);


    function isCollisionWithWall() {
        if (ballPosition.r > 390 | ballPosition.r < 0) {
            return true;
        }
    }

    function isCollisionWithBar() {
        if (ballPosition.r >= currentBarPos && ballPosition.r <= currentBarPos + 60 && ballPosition.c < 10) {
            return true;
        }
        if (ballPosition.r >= rightBarPos && ballPosition.r <= rightBarPos + 60 && ballPosition.c > 790) {
            return true;
        }
    }
    function moveBall() {
        if (isCollisionWithWall()) {
            dr = -dr;
        }

        else if (isCollisionWithBar()) {
            if (ballPosition.r <= leftBar + 30 || ballPosition.r <= rightBar + 30) dr = -10;
            else dr = 10;
            ballDirection = ballDirection === 'right' ? 'left' : 'right';
            dc = -dc;
        }
        ballPosition.r = ballPosition.r + dr;
        ballPosition.c = ballPosition.c + dc;
        ball.style.top = `${ballPosition.r}px`;
        ball.style.left = `${ballPosition.c}px`;
    }

    function startGame() {
        button.style.display = 'none';
        drawBall();
        let speed = 40;
        intervalId = setInterval(() => {
            if (!isCollisionWithBar() && (ballPosition.c < 0 || ballPosition.c > 790)) {
                clearInterval(intervalId);
                ballPosition.r = 200;
                ballPosition.c = 400;
                startGame();
            }
            moveBall(), computerMovement()
        }, 40);
    }

    function ballMissedByBar() {

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
        if (code === 'ArrowUp' && currentBarPos > 0) {
            currentBarPos -= 10;
        }
        else if (code === 'ArrowDown' && currentBarPos < height - 60) {
            currentBarPos += 10;
        }
        leftBar.style.top = `${currentBarPos}px`;
    }
});