
let matrix = []

let matrixSize = +prompt("n")
let side = 500
let grassArr = []
let grassEatersArr = []
let predatorsArr = []

function generateMatrix(matrixSize, grassCount, grassEaterCount, predatorCount) {
    for (let y = 0; y < matrixSize; y++) {
        matrix[y] = []

        for (let x = 0; x < matrixSize; x++) {
            matrix[y][x] = 0
        }
    }

    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        } else {
            i--
        }
    }

    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        } else {
            i--
        }
    }

    // place predators as "3"
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        } else {
            i--
        }
    }


    return matrix
}

function setup() {
    generateMatrix(matrixSize, matrixSize * 2, matrixSize, matrixSize / 2)

    frameRate(5)
    createCanvas(side, side)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let newGrass = new Grass(x, y)
                grassArr.push(newGrass)
            } else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y)
                grassEatersArr.push(grassEater)
            } else if (matrix[y][x] == 3) {          // Predator
                let predator = new Predator(x, y)
                predatorsArr.push(predator)
            }
        }
    }
}

function draw() {
    for (let i in grassArr) {
        grassArr[i].mul()
    };

    for (let i in grassEatersArr) {
        grassEatersArr[i].eat()
    };

    for (let i in predatorsArr) {
        predatorsArr[i].eat()
    };

    let cell = side / matrixSize


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 0) {
                fill("#acacac")
            } else if (matrix[y][x] === 1) {
                fill("green")
            } else if (matrix[y][x] === 2) {
                fill("yellow")
            } else if (matrix[y][x] === 3) {
                fill("red")          // predator color
            }
            rect(x * cell, y * cell, cell, cell)
        }
    }
}


