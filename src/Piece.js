import React, {Component} from 'react'
import BCell from './Board'
const format = "svg"
const withinBounds = (move) => {
    return (move.x >= 0 && move.x < 8) && (move.y >= 0 && move.y < 8)
}
const moveMap = new Map()

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
    }

    move(dst, board){
        let newMove = new Move(dst.x, dst.y)
        let hasMove = false
        let xyz = moveMap.get(this.name)(this.cell, board)
        for(let move of xyz){
            console.log(move, newMove)
            if(newMove.equals(move)){
                hasMove = true
                break
            }
        }
        if(hasMove){
            dst.setPiece(this.cell.piece)
            this.cell.piece = null
        }

        return hasMove            
    }
}

export class Pawn{
    static move(cell, board){
        let moves = new Set()
        if(cell.piece.player === "black"){
            let a = new Move(cell.x + 1, cell.y)
            let b = new Move(cell.x + 2, cell.y)
            if(withinBounds(a))
                moves.add(a)
            else
                a = null 
            if(cell.x === 1){
                if(withinBounds(b))
                    moves.add(b)
                else
                    b = null
            }
        }
        else{
            let a = new Move(cell.x - 1, cell.y)
            let b = new Move(cell.x - 2, cell.y)
            if(withinBounds(a))
                moves.add(a)
            else
                a = null 
            if(cell.x === 6){
                if(withinBounds(b))
                    moves.add(b)
                else
                    b = null
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

        for(let i = 0; i < potential.length; i++){
            if(withinBounds(potential[i])){
                moves.add(potential[i])
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
            if(!temp.equals(cell) && cell.player !== board[i][j].player){
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    //alert('hello')
                    break
                }
            }
            i--
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    //alert('hello1')
                    break
                }
            }
            i++
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    break
                }
            }
            j++
        }
        i = cell.x
        j = cell.y
        while(i >= 0 && i < 8 && j < 8 && j >= 0){
            temp = new Move(i, j)
            if(!temp.equals(cell)){
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    break
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
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    break
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
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    break
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
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    break
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
                moves.add(temp)
                if(board[i][j].holdsPiece()){
                    break
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
        let moves = new Set()
        let potential = [new Move(cell.x, cell.y-1), new Move(cell.x, cell.y+1),
                    new Move(cell.x+1, cell.y), new Move(cell.x-1, cell.y)]
        for(let i = 0; i < potential.length; i++){
            if(withinBounds(potential[i]))
                moves.add(potential[i])
            else
                potential[i] = null
        }
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