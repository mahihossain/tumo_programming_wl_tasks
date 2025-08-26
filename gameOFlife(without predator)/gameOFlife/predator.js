class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 50
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(chars) {
        this.updateDirections()
        const targets = Array.isArray(chars) ? chars : [chars]
        const found = []
        for (let [x, y] of this.directions) {
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (targets.includes(matrix[y][x])) found.push([x, y])
            }
        }
        return found
    }


    mul() {
        let newCell = random(this.chooseCell(0))
        if (this.energy >= 20 && newCell) {
            let predator = new Predator(newCell[0], newCell[1])
            predatorsArr.push(predator)
            matrix[newCell[1]][newCell[0]] = 3
            this.energy = 14
        }
    }

    eat() {
        const cells = this.chooseCell(2)   // eat GrassEater (2)
        const prey = random(cells)
        if (prey) {
            this.energy++
            matrix[this.y][this.x] = 0

            const newX = prey[0]
            const newY = prey[1]
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY

            // remove eaten GrassEater from array
            for (let i in grassEatersArr) {
                if (newX == grassEatersArr[i].x && newY == grassEatersArr[i].y) {
                    grassEatersArr.splice(i, 1)
                    break
                }
            }

            if (this.energy >= 16) this.mul()
        } else {
            this.move()
        }
    }

    move() {
        this.energy--  // or this.energy -= 2 for higher cost per step
        const candidates = this.chooseCell([0, 1])  // allow moving onto empty or grass
        const newCell = random(candidates)
        if (newCell) {
            const [newX, newY] = newCell

            // if stepping on grass, remove it from grassArr
            if (matrix[newY][newX] === 1) {
                for (let i in grassArr) {
                    if (grassArr[i].x === newX && grassArr[i].y === newY) {
                        grassArr.splice(i, 1)
                        break
                    }
                }
            }

            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
        }
        if (this.energy <= 0) this.die()
    }


    updateDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }


    die() {
        matrix[this.y][this.x] = 0
        for (let i in predatorsArr) {
            if (this.x == predatorsArr[i].x && this.y == predatorsArr[i].y) {
                predatorsArr.splice(i, 1)
                break
            }
        }
    }
}
