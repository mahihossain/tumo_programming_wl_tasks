class GrassEater {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.energy = 30;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 8 && newCell) {
            let grassEater = new GrassEater(newCell[0], newCell[1]);
            grassEatersArr.push(grassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }


    eat() {
        const cells = this.chooseCell(1);
        const food = random(cells);
        if (food) {
            this.energy += 10;
            matrix[this.y][this.x] = 0;
            let newX = food[0];
            let newY = food[1];
            matrix[ food[1] ][ food[0] ] = 2;
            this.x = newX;
            this.y = newY;
            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break ;
                }
            }
            if (this.energy >= 10) {
                this.mul();
            }
        }  
        else {
            this.move();
        }
    }
    
    move() {

        this.energy--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
        } 
        if (this.energy <= 0) {
                this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEatersArr) {
            if (this.x == grassEatersArr[i].x && this.y == grassEatersArr[i].y) {
                grassEatersArr.splice(i, 1);
                break ;
            }
        }
    }

    }
