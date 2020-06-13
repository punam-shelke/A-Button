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