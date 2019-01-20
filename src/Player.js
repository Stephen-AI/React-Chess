import {moveMap} from './Piece'
export class Player{
    constructor(name){
        this.name = name
        this.active = []
        this.captured = []
        this.checked = false
        this.kingLocation = null

        this.addPiece = this.addPiece.bind(this)
        this.capturePiece = this.capturePiece.bind(this)
        this.updatePiece = this.updatePiece.bind(this)
        this.checkedOpponent = this.checkedOpponent.bind(this)
    }

    addPiece(piece){
        this.active.push(piece)
        if(piece.name === "king")
            this.kingLocation = piece.cell
    }

    capturePiece(piece){
        let i
        for(i = 0; i < this.active.length; i++){
            if(this.active[i].equals(piece))
                break
        }
        this.active.splice(i, 1)
        this.captured.push(piece)
    }

    updatePiece(prev, piece){
        let i
        for(i = 0; i < this.active.length; i++){
            if(this.active[i].equals(prev))
                break
        }
        this.active.splice(i, 1)
        this.addPiece(piece)
    }

    checkedOpponent(kingLoc, board){
        for(let piece of this.active){
            for(let move of moveMap.get(piece.name)(piece.cell, board)){
                if(move.equals(kingLoc))
                    return true
            }
        }
        return false
    }
}