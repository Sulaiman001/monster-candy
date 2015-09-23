window.addEventListener("load", function () {

    //define constants
    var GAME_WIDTH = 960;
    var GAME_HEIGHT = 640;

    var enemyWidth = 50;
    var enemyHeight = 50;

    //enemies
    var enemies = [
        {
            x: 150, //x coordinate
            y: 50, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: 2 //speed in Y
            },
        {
            x: 250, //x coordinate
            y: 550, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: 1 //speed in Y
            },
        {
            x: 370, //x coordinate
            y: 400, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: -2 //speed in Y
            },
        {
            x: 520, //x coordinate
            y: 200, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: -2 //speed in Y
            },
        {
            x: 640, //x coordinate
            y: 550, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: 1 //speed in Y
            },
        {
            x: 760, //x coordinate
            y: 100, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: 2 //speed in Y
            }
        ]

    //player
    var player = {
        x: 50, //x coordinate
        y: 300, //y coordinate
        w: 50, //width property
        h: 50, //height property
        speedX: 4, //speed in X
        isMoving: false
    }

    //goal
    var goal = {
        x: 880, //x coordinate
        y: 300, //y coordinate
        w: 50, //width property
        h: 50, //height property
    }

    //set levels
    var level = 1;
    var levelCount = 1;

    //keep the game going
    var gameLive = true;

    //basic player movement setup
    var movePlayer = function () {
        player.isMoving = true;
    };

    var stopPlayer = function () {
        player.isMoving = false;
    };

    //grab the canvas and context
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    //event listeners for interaction
    canvas.addEventListener("mousedown", movePlayer);
    canvas.addEventListener("mouseup", stopPlayer);
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);

    var sprites = {};

    var load = function () {
        sprites.enemy = new Image();
        sprites.enemy.src = "images/evil-candy.png";
        
        sprites.playerImg = new Image();
        sprites.playerImg.src = "images/baby-monster.png";
        
        //add initial level number
        var setFirstLevel = function() {
            document.getElementById("js-levelCount").innerHTML = 1;
        };
        setFirstLevel();
    };

    //update the logic
    var update = function () {

        //check if you've won the game

        if (checkCollision(player, goal)) {

            //increase level
            level++;
            
            //update level counter
            var increaseLevel = function() {
                //find the element on the page and insert new level
                document.getElementById("js-levelCount").innerHTML = level;
            }
            increaseLevel();

            //set player back to the start
            player.x = 50;

            //increase the speed of the enemies by 1
            enemies.forEach(function (element, index) {
                element.speedY += element.speedY / Math.abs(element.speedY);
            });

        };

        //player speed
        if (player.isMoving) {
            player.x = player.x + player.speedX
        };

        //start enemies moving
        enemies.forEach(function (element, index) {

            //check for collision
            if (checkCollision(player, element)) {
                //stop the game

                gameLive = false;

                alert('Game over!');

                window.location = "";
            };

            //enemy speed
            element.y += element.speedY;

            //check for game borders and reverse speed
            if (element.y <= 10) {
                element.y = 10;
                element.speedY *= -1;
            } else if (element.y >= GAME_HEIGHT - 100) {
                element.y = GAME_HEIGHT - 100;
                element.speedY *= -1;
            };
        });

    };

    //draw
    var draw = function () {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        //draw player
        ctx.drawImage(sprites.playerImg, player.x, player.y);
        
        //draw goal
        ctx.fillStyle = ("#FFC763");
        ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
        
        //draw enemies
        enemies.forEach(function (element, index) {
            ctx.drawImage(sprites.enemy, element.x, element.y);
        });
    };

    //gets executed multiple times per second
    var step = function () {

        update();
        draw();

        if (gameLive) {
            window.requestAnimationFrame(step);
        }
    };


    //check the collision between two rectangles
    var checkCollision = function (rect1, rect2) {

        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnWidth && closeOnHeight;


    };

    //initial kick
    load();
    step();

}); //load listener
