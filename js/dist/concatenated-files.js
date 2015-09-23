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
            x: 400, //x coordinate
            y: 400, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: -2 //speed in Y
            },
        {
            x:570, //x coordinate
            y: 200, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: -2 //speed in Y
            },
        {
            x: 700, //x coordinate
            y: 550, //y coordinate
            w: enemyWidth, //width property
            h: enemyHeight, //height property
            speedY: 2 //speed in Y
            },
        {
            x: 800, //x coordinate
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
            speedX: 2, //speed in X
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
    
    //keep the game going
    var gameLive = true;
    
    //basic player movement setup
    var movePlayer = function() {
        player.isMoving = true;
    };
    
    var stopPlayer = function() {
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

    //update the logic
    var update = function () {
        
        //check if you've won the game
        
        if(checkCollision(player, goal)) {
            
            //increase level
            level++;
            
            //set player back to the start
            player.x = 50;
            
            //increase the speed of the enemies by 1
            enemies.forEach(function (element, index) {
                element.speedY += element.speedY / Math.abs(element.speedY);
            });
            
        };
        
        //player speed
        if(player.isMoving) {
            player.x = player.x + player.speedX 
        };
        
        //start enemies moving
        enemies.forEach(function (element, index) {
            
            //check for collision
            if(checkCollision(player, element)) {
                //stop the game
                gameLive = false;
                
                alert("game over!");
                
                //reload page
                window.location = "";
            };
            
            //enemy speed
            element.y += element.speedY;
            
            //check for game borders and reverse speed
            if (element.y <= 10) {
                element.y = 10;
                element.speedY *= -1;
            } else if (element.y >= GAME_HEIGHT - 50) {
                element.y = GAME_HEIGHT - 50;
                element.speedY *= -1;
            };
        });

    };

    //draw
    var draw = function () {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        ctx.fillStyle = ("#6960FF");
        ctx.fillRect(player.x, player.y, player.w, player.h);
        
        ctx.fillStyle = ("#FFC763");
        ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
        
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
    
    
    //check the collision between two rectangles
    var checkCollision = function (rect1, rect2) {

        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnWidth && closeOnHeight;
    };

    //initial kick
    step();

}); //load listener