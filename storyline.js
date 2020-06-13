/**
 * get the canvas by it's ID
 */
let frame_context = (document.querySelector(`canvas`)).getContext(`2d`);

//set the height and width of the canvas
frame_context.canvas.width = 900;
frame_context.canvas.height = 600;

//set black background color
frame_context.fillStyle = `#080000`;
frame_context.fillRect(0, 0, 900, 600);


//set players height ,width , new and old x / y cordinate , speeds 
let player = {
    width: 40,
    height: 40,
    x_cordinate: 0,
    y_cordinate: 180,
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
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 9, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,

    ],

    //tile size
    size_of_tile: 60, cols: 15, rows: 10
}

//My main function responsible for animation
let drawAnimationFrame = function () {
    if (friend.y > frame_context.canvas.height) {
        alert(`You Stepped on wrong tile!!YOU MUST SAVE YOUR FRIEND`);
        let identifier = { id: "0" };
        window.history.replaceState(identifier,
            "/A-Button/animationcreation", "/A-Button/animationcreation.html");
        window.location.reload();
        return;
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
    if (player.y_cordinate >= 240 - player.height && player.x_cordinate >= 360 - player.width) {
        Drawing.tiles[67] = 0;
        friend.y += 3;
    }

    //collision detection with floor
    if (player.y_cordinate > 240 - player.height) {
        player.in_air = false;
        player.speed_y = 0;
        player.y_cordinate = player.old_y_cordinate = 240 - player.height;

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
    else if (player.x_cordinate + player.width > 360) {
        player.speed_x = 0;
        player.x_cordinate = player.old_x_cordinate = 360 - player.width;
    }
    //adding friction to gradually slow player down
    player.speed_x *= 0.9;
    player.speed_y *= 0.9;
    //drawing tiles to the canvas from tiles array
    for (let index = 0; index < Drawing.tiles.length; index++) {
        frame_context.fillStyle = (Drawing.tiles[index] >= 1) ? `#fff${Drawing.tiles[index]}ff` : `#000000`;//setting color of tile
        frame_context.fillRect((index % Drawing.cols) * Drawing.size_of_tile, Math.floor(index / Drawing.cols) * Drawing.size_of_tile, Drawing.size_of_tile, Drawing.size_of_tile);
    }
    //frame_context.fillStyle = `#008000`;
    //frame_context.fillRect(player.x_cordinate, player.y_cordinate, player.width, player.height);
    frame_context.drawImage(player.image, 0, 0, 16, 16, Math.floor(player.x_cordinate), Math.floor(player.y_cordinate), 40, 40);
    frame_context.drawImage(friend.image, 0, 0, 86, 95, Math.floor(friend.x), Math.floor(friend.y), 86, 95);
    window.requestAnimationFrame(drawAnimationFrame);
}
//window.requestAnimationFrame(drawAnimationFrame);
window.addEventListener(`keydown`, keyBoardListener.updateKeyStatus);
window.addEventListener(`keyup`, keyBoardListener.updateKeyStatus);

player.image.addEventListener(`load`, function (event) {
    window.requestAnimationFrame(drawAnimationFrame);
});
player.image.src = `./animation.png`;
let friend = {
    image: new Image(),
    x: 430,
    y: 150
}
friend.image.src = `friend.png`;
