/**
 * get the canvas by it's ID
 */
let frame_context = (document.querySelector(`canvas`)).getContext(`2d`);

//set the height and width of the canvas
frame_context.canvas.width = 900;
frame_context.canvas.height = 600;

//set black background color
frame_context.fillStyle = `#000000`;
frame_context.fillRect(0, 0, 900, 600);

//Day count 
let day = 0;
//location of canvas
let canvas_location = frame_context.canvas.getBoundingClientRect();
//declaring sun
let sun = {
    radius: 30,
    color: `#f80000`,
    x_cordinate: 450,
    y_cordinate: 50,

    mouseListener: function (event) {
        canvas_location = frame_context.canvas.getBoundingClientRect();
        sun.x_cordinate = event.clientX - canvas_location.left;
        sun.y_cordinate = event.clientY - canvas_location.top;
    }
}


//set players height ,width , new and old x / y cordinate , speeds 
let player = {
    width: 40,
    height: 40,
    x_cordinate: 0,
    y_cordinate: 0,
    speed_x: 0,
    speed_y: 0,
    in_air: false,
    old_x_cordinate: 0,
    old_y_cordinate: 0
};
// create player image
player.image = new Image();
console.log(player.image);

//handles status updation of different keys
let keyBoardListener = {
    left_key_status: false,
    right_key_status: false,
    up_key_status: false,
    //Physical key status refers to actual status of event
    physical_key_status: false,

    //Virtual key status is true if key is pressed one time and will be false 
    //if key is pressed for long time without release.

    virtual_key_status: false,
    //updating key status everytime event happens
    updateKeyStatus: function (event) {
        //setting key status
        keyBoardListener.physical_key_status = (event.type == `keydown`) ? true : false;
        switch (event.code) {
            case `ArrowUp`: keyBoardListener.up_key_status = keyBoardListener.physical_key_status;
                break;
            case `ArrowLeft`: keyBoardListener.left_key_status = keyBoardListener.physical_key_status;
                break;
            case `ArrowRight`: keyBoardListener.right_key_status = keyBoardListener.physical_key_status;
                break;
        }
    }
}

//Map of the level
let Drawing = {
    //for user
    tiles: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1,
        0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

    ],
    //for collision detection
    tiles_for_collision_resolution: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,

    ],
    //tile size
    size_of_tile: 60, cols: 15, rows: 10
}

//My main function responsible for animation
let drawAnimationFrame = function () {
    //Checking how many days have passed
    if (sun.x_cordinate > 870) {
        sun.x_cordinate = 450;
        sun.y_cordinate = 50;
        day++;
        alert(`day ${day} has passed!`);
        if (day == 3) {
            alert(`Tiles are activated`);//55,83,111
            Drawing.tiles_for_collision_resolution[55] = 2;
            Drawing.tiles_for_collision_resolution[83] = 2;
            Drawing.tiles_for_collision_resolution[111] = 2;
        }
    }
    /*
    1.Check for event listener
    2.update speed
    3.Update locations
    4.Add gravity
    5.check for collision
    6.resolve collision
    7.add friction to speed.;)
    */
    console.log(`x:${sun.x_cordinate},y:${sun.y_cordinate}`);
    if (keyBoardListener.right_key_status) {
        //adding speed gradually on right side
        player.speed_x += 0.5;
    }
    if (keyBoardListener.left_key_status) {
        //adding speed gradually on left side
        player.speed_x -= 0.5;
    }
    if (keyBoardListener.up_key_status && !player.in_air) {
        //jumping when on the ground
        player.in_air = true;
        //setting jump height
        player.speed_y = -35;
    }

    player.speed_y += 1;//pseudo gravity

    //save old position for collision detection
    player.old_x_cordinate = player.x_cordinate;
    player.old_y_cordinate = player.y_cordinate;

    //update new position
    player.x_cordinate += player.speed_x;
    player.y_cordinate += player.speed_y;

    //collision of sun with top
    if (sun.y_cordinate < sun.radius) {
        sun.y_cordinate = sun.radius;
    }
    //collision of sun with left wall
    if (sun.x_cordinate < sun.radius) {
        sun.x_cordinate = sun.radius;
    }
    //collision of sun with right wall
    if (sun.x_cordinate > frame_context.canvas.width - sun.radius) {
        sun.x_cordinate = frame_context.canvas.width - sun.radius;
    }
    //collision with floor
    if (sun.y_cordinate > frame_context.canvas.height - sun.radius - Drawing.size_of_tile) {
        sun.y_cordinate = frame_context.canvas.height - sun.radius - Drawing.size_of_tile;
    }
    //collision detection with floor
    if (player.y_cordinate > frame_context.canvas.height - player.height) {
        player.in_air = false;
        player.speed_y = 0;
        player.y_cordinate = player.old_y_cordinate = frame_context.canvas.height - player.height;

    }
    //collision with top wall
    else if (player.y_cordinate < 0) {
        player.speed_y = 0;
        player.y_cordinate = player.old_y_cordinate = 0;
    }
    //collision on left wall
    if (player.x_cordinate < 0) {
        player.speed_x = 0;
        player.x_cordinate = player.old_x_cordinate = 0;
    }
    //collision detection with right wall
    else if (player.x_cordinate > frame_context.canvas.width) {
        let identifier = { id: "2" };
        window.history.replaceState(identifier,
            "level3", "/level3.html");
        window.location.reload();
        return;
    }

    /*
    Checking collision and resolving with the different tiles
    1.check the direction of player
    2.check collision for 2 corner points
    3.identify tile of collision and resolve accordingly
    */

    //variables required to detect and resolve collision
    let x_position, y_position, column_value, row_value, tile_value;
    if (player.x_cordinate > player.old_x_cordinate) {//if player is moving right
        //check for top right corner
        x_position = player.x_cordinate + player.width;//finding x-coordinate of the corner
        y_position = player.y_cordinate; //finding y-coordinate of corner

        //mapping players corner values to the tile  grid
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);

        //mapping column and row values of grid to 1D tile drawing value
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }

        //check for bottom right corner
        x_position = player.x_cordinate + player.width;
        y_position = player.y_position + player.height;

        //.mapping cordinates to 2d grid
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);

        //mapping column and rows to 1d tile value
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }

    }
    else if (player.x_cordinate < player.old_x_cordinate) {//if player is moving left 
        //check for top left corner

        //getting x and y co-ordinates for top - left corner
        x_position = player.x_cordinate;
        y_position = player.y_cordinate;
        //converting those co-ordinates to grid
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);
        //Mapping those to 1D tile Drawing
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }
        //check for bottom left corner
        //get the x and y co-ordinates
        x_position = player.x_cordinate;
        y_position = player.y_position + player.height;
        // convert them to grid format
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);
        //converting it to 1D tile value
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }

    }
    if (player.y_cordinate < player.old_y_cordinate) {//if player is moving up
        //check for top-left corner
        //get x and y co-ordinates for top left
        x_position = player.x_cordinate;
        y_position = player.y_cordinate;
        //converting co-ordinates to grid format
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);
        //getting 1D value from the array
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }
        //check for top right corner
        //finding x and y co-ordinates for top-right
        x_position = player.x_cordinate + player.width;
        y_position = player.y_position;
        //converting to 2D grid
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);
        //converting values to 1D tile value
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }

    }
    else if (player.y_cordinate > player.old_y_cordinate) {//if player is moving down
        //check for bottom left corner
        //finding co-ordinates of bottom-left
        x_position = player.x_cordinate;
        y_position = player.y_cordinate + player.height;
        //converting it to grid format
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);
        //converting row and column value to 1D array
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        //checking tile value and resolving collision if any
        if (tile_value > 0) {
            resolveCollision(tile_value, row_value, column_value);
        }
        //check for bottom right corner
        //getting co -ordinates for bottom - right corner
        x_position = player.x_cordinate + player.width;
        y_position = player.y_position + player.height;
        //converting them to 2D grid 
        column_value = Math.floor(x_position / Drawing.size_of_tile);
        row_value = Math.floor(y_position / Drawing.size_of_tile);
        //converting rows and cols to 1D tile Drawing value
        tile_value = Drawing.tiles_for_collision_resolution[row_value * Drawing.cols + column_value];
        if (tile_value > 0) {//checking and resolving collision if any
            resolveCollision(tile_value, row_value, column_value);
        }
    }
    //adding friction to gradually slow player down
    player.speed_x *= 0.9;
    player.speed_y *= 0.9;
    //drawing tiles to the canvas from tiles array
    for (let index = 0; index < Drawing.tiles.length; index++) {
        frame_context.fillStyle = (Drawing.tiles[index] == 1) ? `#000000` : `#ffffff`;//setting color of tile
        frame_context.fillRect((index % Drawing.cols) * Drawing.size_of_tile, Math.floor(index / Drawing.cols) * Drawing.size_of_tile, Drawing.size_of_tile, Drawing.size_of_tile);
    }
    frame_context.beginPath();
    frame_context.fillStyle = sun.color;
    frame_context.arc(sun.x_cordinate, sun.y_cordinate, sun.radius, 0, Math.PI * 2);
    frame_context.fill();
    frame_context.drawImage(player.image, 0, 0, 16, 16, Math.floor(player.x_cordinate), Math.floor(player.y_cordinate), 40, 40);
    window.requestAnimationFrame(drawAnimationFrame);
}
//window.requestAnimationFrame(drawAnimationFrame);
window.addEventListener(`keydown`, keyBoardListener.updateKeyStatus);
window.addEventListener(`keyup`, keyBoardListener.updateKeyStatus);
window.addEventListener(`mousedown`, sun.mouseListener)
player.image.addEventListener(`load`, function (event) {
    console.log(`onload fired`)
    window.requestAnimationFrame(drawAnimationFrame);
});
player.image.src = `./animation.png`;

//function for assigning different collision technique
function resolveCollision(tile_value, row, column) {
    switch (tile_value) {//distributing collision according to tile - type
        case 1://right - wall tiles
            resolveLeftCollision(row, column);
            break;
        case 2://bricks
            if (resolveTopCollision(row, column)) return;
            if (resolveBottomCollision(row, column)) return;
            if (resolveLeftCollision(row, column)) return;
            if (resolveRightCollision(row, column))
                break;
    }

}
//Resolving top collision of tile
function resolveTopCollision(row, column) {//row and column tile is in grid
    if (player.y_cordinate > player.old_y_cordinate) {//for top-collision player should be moving down
        let y_value_of_tile_top = row * Drawing.size_of_tile;
        if (player.y_cordinate + player.height > y_value_of_tile_top && player.old_y_cordinate + player.height <= y_value_of_tile_top) {
            player.speed_y = 0;
            player.in_air = false;
            player.old_y_cordinate = player.y_cordinate = y_value_of_tile_top - player.height - 0.01;
            return true;
        }

    }
    return false;
}

function resolveBottomCollision(row, column) {
    if (player.y_cordinate < player.old_y_cordinate) { //player should be moving up
        let y_value_of_tile_bottom = (row + 1) * Drawing.size_of_tile;
        if (player.y_cordinate < y_value_of_tile_bottom && player.old_y_cordinate >= y_value_of_tile_bottom) {
            player.speed_y = 0;
            player.y_cordinate = player.old_y_cordinate = y_value_of_tile_bottom;
            return true;
        }


    }
    return false;
}
function resolveRightCollision(row, column) {
    if (player.x_cordinate < player.old_x_cordinate) {//for right collision to the tile player should move from left
        let x_value_of_tile_right = (column + 1) * Drawing.size_of_tile;
        if (player.x_cordinate < x_value_of_tile_right && player.old_x_cordinate >= x_value_of_tile_right) {
            player.speed_x = 0;
            player.x_cordinate = player.old_x_cordinate = x_value_of_tile_right;
            return true;
        }


    }
    return false;
}
function resolveLeftCollision(row, column) {//to collide at left with tile ,player should be moving right
    if (player.x_cordinate > player.old_x_cordinate) {
        let x_value_of_tile_left = (column) * Drawing.size_of_tile;
        if (player.x_cordinate + player.width > x_value_of_tile_left && player.old_x_cordinate + player.width <= x_value_of_tile_left) {
            player.speed_x = 0;
            player.x_cordinate = player.old_x_cordinate = x_value_of_tile_left - player.width - 0.01;
            return true;
        }


    }
    return false;
}