const withinBounds = (move) => {
    return (move.x >= 0 && move.x < 8) && (move.y >= 0 && move.y < 8)
}
export let moveMap = new Map()

class Move{
    constructor(x, y){
        this.x = x
        this.y = y
        this.equals = this.equals.bind(this)
    }

    equals(move){
        return move.x === this.x && move.y === this.y 
    }
}

export class Piece {
    constructor(name, player, cell){
        this.name = name
        this.player = player
        this.cell = cell
        this.move = this.move.bind(this)
        this.equals = this.equals.bind(this)
    }

    move(dst, board){
        let newMove = new Move(dst.x, dst.y)
        let hasMove = false
        let xyz = moveMap.get(this.name)(this.cell, board)
        for(let move of xyz){
            if(newMove.equals(move)){
                hasMove = true
                break
            }
        }
        if(hasMove){
            dst.setPiece(this)
            this.cell.piece = null
        }

        return hasMove            
    }

    equals(piece){
        return this.name === piece.name && this.player === piece.player && 
                this.cell.equals(piece.cell)
    }
}

export class Pawn{
    static move(cell, board){
        let moves = new Set()
        if(cell.piece.player === "black"){
            let a = new Move(cell.x + 1, cell.y)
            let b = new Move(cell.x + 2, cell.y)
            let captureA = new Move(cell.x + 1, cell.y + 1)
            let captureB = new Move(cell.x + 1, cell.y - 1) 
            /* TODO: Add logic for capturing a piece */
            if(withinBounds(a)){
                if(!board[a.x][a.y].holdsPiece())
                    moves.add(a)
            }
            else
                a = null
            if(withinBounds(captureA)){
                if(board[captureA.x][captureA.y].holdsPiece())
                    moves.add(captureA)
            }
            if(withinBounds(captureB)){
                if(board[captureB.x][captureB.y].holdsPiece())
                    moves.add(captureB)
            }
            if(cell.x === 1){
                if(withinBounds(b)){
                    if(!board[b.x][b.y].holdsPiece())
                        moves.add(b)                        
                }
            }

        }
        else{
            let a = new Move(cell.x - 1, cell.y)
            let b = new Move(cell.x - 2, cell.y)
            let captureA = new Move(cell.x - 1, cell.y + 1)
            let captureB = new Move(cell.x - 1, cell.y - 1) 
            if(withinBounds(a)){
                if(!board[a.x][a.y].holdsPiece())
                    moves.add(a)
            }
            else
                a = null
            if(withinBounds(captureA)){
                if(board[captureA.x][captureA.y].holdsPiece())
                    moves.add(captureA)
            }
            if(withinBounds(captureB)){
                if(board[captureB.x][captureB.y].holdsPiece())
                    moves.add(captureB)
            }
            if(cell.x === 6){
                if(withinBounds(b)){
                    if(!board[b.x][b.y].holdsPiece())
                        moves.add(b)                        
                }
            }
        }
        
        return moves
    }
}

export class Knight {

    static move(cell, board){
        let moves = new Set()
        let potential = [
                    new Move(cell.x + 1, cell.y + 2),
                    new Move(cell.x - 1, cell.y + 2),
                    new Move(cell.x + 1, cell.y - 2),
                    new Move(cell.x - 1, cell.y - 2),
                    new Move(cell.x + 2, cell.y + 1),
                    new Move(cell.x + 2, cell.y - 1),
                    new Move(cell.x - 2, cell.y + 1),
                    new Move(cell.x - 2, cell.y - 1)
        ]
        let temp
        for(let i = 0; i < potential.length; i++){
            if(withinBounds(potential[i])){
                temp = potential[i]
                if(board[temp.x][temp.y].holdsPiece()){
                    if(board[temp.x][temp.y].piece.player !== cell.piece.player)
                        moves.add(temp)
                }
                else
                    moves.add(temp)
            }
            else
                potential[i] = null
        }
        return moves
    }
}

export class Rook{
    static move(cell, board){
        let moves = new Set()
        let temp
        let i = cell.x
        let j = cell.y
        
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                //can only capture opponent's piece
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }
            i--
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }
            i++
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }
            j++
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }
            j--
        }
        return moves
    }
}

export class Bishop{
    static move(cell, board){
        let i = cell.x
        let j = cell.y
        let temp
        let moves = new Set()
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }    
            i--
            j--
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }   
            i++
            j++
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }    
            i--
            j++
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                if(board[i][j].holdsPiece()){
                    if(board[i][j].piece.player !== cell.piece.player)
                        moves.add(temp)
                    break
                }
                else{
                    moves.add(temp)
                }
            }    
            i++
            j--
        }
        return moves

    }
}

export class King{
    static move(cell, board){
        /* TODO: Add logic for when a king is checked and castling */
        let moves = new Set()
        let potential = [new Move(cell.x, cell.y-1), new Move(cell.x, cell.y+1),
                    new Move(cell.x+1, cell.y), new Move(cell.x-1, cell.y), new Move(cell.x+1, cell.y+1), 
                    new Move(cell.x+1, cell.y-1), new Move(cell.x-1, cell.y+1), new Move(cell.x-1, cell.y-1)]
        let temp
        for(let i = 0; i < potential.length; i++){
            if(withinBounds(potential[i])){   
                temp = potential[i]             
                if(board[temp.x][temp.y].holdsPiece()){
                    if(board[temp.x][temp.y].piece.player !== cell.piece.player){
                        moves.add(temp)}
                }
                else{
                    moves.add(temp)
                }
            }
            else
                potential[i] = null
        }
        console.log(moves)
        return moves
    }
}

export class Queen{
    static move(cell, board){
        let moves = new Set()
        for (let move of Rook.move(cell, board))
            moves.add(move)
        for (let move of Bishop.move(cell, board))
            moves.add(move)
        return moves
    }
}

moveMap.set("pawn", Pawn.move)
moveMap.set("rook", Rook.move)
moveMap.set("knight", Knight.move)
moveMap.set("bishop", Bishop.move)
moveMap.set("queen", Queen.move)
moveMap.set("king", King.move)