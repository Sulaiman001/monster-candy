window.addEventListener("load", function () {

    //define constants
    var GAME_WIDTH = 960;
    var GAME_HEIGHT = 640;

    //grab the canvas and context
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    //keep the game going
    var gameLive = true;

    //enemies
    var enemies = [
        {
            x: 150, //x coordinate
            y: 50, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 1 //speed in Y
            },
        {
            x: 250, //x coordinate
            y: 150, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 2 //speed in Y
            },
        {
            x: 400, //x coordinate
            y: 70, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: -2 //speed in Y
            },
        {
            x:570, //x coordinate
            y: 200, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: -2 //speed in Y
            },
        {
            x: 700, //x coordinate
            y: 550, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 1 //speed in Y
            },
        {
            x: 820, //x coordinate
            y: 300, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 2 //speed in Y
            }
        ]
    
    //player
    var player = {
            x: 50, //x coordinate
            y: 300, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedX: 2 //speed in X
    }

    //update the logic
    var update = function () {

        enemies.forEach(function (element, index) {
            element.y += element.speedY;
            
            //check for game borders and reverse speed
            if (element.y <= 10) {
                element.y = 10;
                element.speedY *= -1;
            } else if (element.y >= GAME_HEIGHT - 50) {
                element.y = GAME_HEIGHT - 50;
                element.speedY *= -1;
            }
        });

    };

    //draw
    var draw = function () {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        ctx.fillStyle = ("#6960FF");
        ctx.fillRect(player.x, player.y, player.w, player.h);
        
        ctx.fillStyle = ("#1C2326");

        enemies.forEach(function (element, index) {
            ctx.fillRect(element.x, element.y, element.w, element.h);
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

    step();

}); //load listener