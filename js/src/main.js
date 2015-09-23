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
            x: 130, //x coordinate
            y: 50, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 1 //speed in Y
            },
        {
            x: 250, //x coordinate
            y: 450, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 2 //speed in Y
            },
        {
            x: 400, //x coordinate
            y: 450, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: -2 //speed in Y
            },
        {
            x:570, //x coordinate
            y: 100, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 2 //speed in Y
            },
        {
            x: 700, //x coordinate
            y: 550, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: -1 //speed in Y
            },
        {
            x: 820, //x coordinate
            y: 550, //y coordinate
            w: 30, //width property
            h: 30, //height property
            speedY: 2 //speed in Y
            }
        ]

    //update the logic
    var update = function () {

        enemies.forEach(function (element, index) {
            element.y += element.speedY;
        });

    };

    //draw
    var draw = function () {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
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