class Combinations {
    board;
    boardSize;
    boxSize;

    constructor(_board, _boardSize, _boxSize) {
        this.board = _board
        this.boardSize = _boardSize
        this.boxSize = _boxSize
    }

    runCombinations() {
        let funcs = [this.rowShifter, this.columnShifter, this.valueShifter]
        let combs = random(this.boardSize, this.boxSize) * 2
        while (combs > 0) {
            let randFunc = random(funcs.length - 1)
            let val1, val2;

            if (randFunc == 2) {
                val1 = random(this.boardSize, 1)
                val2 = random(this.boardSize, 1)
                while (val1 == val2) {
                    val2 = random(this.boardSize, 1)
                }
            }

            if(randFunc == 1 || randFunc == 0){
                let limits = getSetLimits(this.boardSize)
                let randomSet = random(limits.length-1)
                
                val1 = random(limits[randomSet].length - 1)
                val2 = random(limits[randomSet].length - 1)
                while (val1 == val2) {
                    val2 = random(limits[randomSet].length - 1)
                }
                val1 = limits[randomSet][val1]
                val2 = limits[randomSet][val2]
            }

            funcs[randFunc](val1, val2, this.board)

            combs--;
        }
    }

    columnShifter(col1, col2, board) {
        for (let i = 0; i < board.length; i++) {
            let temp = board[i][col1]
            board[i][col1] = board[i][col2]
            board[i][col2] = temp
        }
    }

    rowShifter(row1, row2, board) {
        let temp = board[row1]
        board[row1] = board[row2]
        board[row2] = temp
    }

    valueShifter(val1, val2, board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] == val1) {
                    board[i][j] = val2
                } else if (board[i][j] == val2) {
                    board[i][j] = val1
                }
            }
        }
    }

    
}