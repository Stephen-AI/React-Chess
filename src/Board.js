import React, {Component} from 'react'
import Cell from './Cell'
import {Pawn, King, Queen, Knight, Rook, Piece} from './Piece'

let officials = ["rook", "knight", "bishop", "queen", "king", "bishop", 
                "knight", "rook"]

export class BCell{
    constructor(x, y, white){
        this.idPiece = this.idPiece.bind(this)
        this.idPlayer = this.idPlayer.bind(this)
        this.holdsPiece = this.holdsPiece.bind(this)
        this.x = x
        this.y = y
        this.color = white ? "blue" : "green"
        this.hl = "false"
        this.piece = new Piece(this.idPiece(x, y), this.idPlayer(x), this)
    }

    setPiece(piece){
        this.piece = new Piece(piece.name, piece.player, this)
    }

    holdsPiece(){
        return this.piece !== null
    }

    idPiece(x, y){
        if(x === 1 || x === 6)
            return "pawn"
        if(x === 0 || x === 7)
            return officials[y]
        return ""
    }

    idPlayer(x){
        if(x === 0 || x === 1)
            return "black"
        if(x === 6 || x === 7)
            return "white"
        return ""
    }


}

class Board extends Component{
    constructor(props){
        super(props)
        this.state = {
            rows : [[], [], [], [], [], [], [], []],
            prevClick : null,
            moveCount: 0,
            turn: "white"
        }
        
        let white
        for(let i = 0; i < 8; i++){
            white = i % 2 === 0
            for(let j = 0; j < 8; j++){
                this.state.rows[i].push(new BCell(i, j, white))
                white = !white
            }
        }

        this.eachCell = this.eachCell.bind(this)
        this.keyToPoint = this.keyToPoint.bind(this)
        this.pointToKey = this.pointToKey.bind(this)
        this.sameCell = this.sameCell.bind(this)
    }

    pointToKey(x, y){
        return x * 8 + y
    }

    keyToPoint(key){
        return ({
                    x : Math.floor(key/8),
                    y : key % 8
                })
    }
  
    /* Render each row in the chessboard */
    eachRow(row, i){
        return (
            <li className="row" key={i}>
                {row.map(cell=>this.eachCell(cell))}
            </li>
        )
    }

    sameCell(a, b){
        return a !== null && b !== null && a.x === b.x && a.y === b.y
    }

    /* When clicked cell should be highlighted red */
    clicked(key, e){
        let k = this.keyToPoint(key)
        let j = this.state.prevClick
        let moved = false
        let cellClicked = this.state.rows[k.x][k.y]
        let prevClicked = j !== null ? this.state.rows[j.x][j.y] : null
        let nextTurn = this.state.turn

        if (this.sameCell(k, j))
            return
        
        //first click since last turn
        //Make sure white doesnt click black pieces and vice versa
        //Cells without pieces are not highlighted either
        if(prevClicked === null){
            if(!cellClicked.holdsPiece() || 
                this.state.turn !== cellClicked.piece.player){
                    return
            }
            else
                cellClicked.hl = "true"
        }
        else{
            if(cellClicked.holdsPiece() && 
                prevClicked.piece.player === cellClicked.piece.player){
                cellClicked.hl = "true"
                prevClicked.hl = "false"
            }
            else{
                moved = prevClicked.piece.move(cellClicked, this.state.rows)
                if(moved){
                    nextTurn = this.state.moveCount % 2 == 0 ? "black" : "white"
                    prevClicked.hl = "false"
                }
            }
        }
        this.setState(prevState => ({
            rows : prevState.rows.map(row => ([...row])),
            prevClick : moved ? null : cellClicked.hl === "true" ? {...k} : prevState.prevClick,
            moveCount : moved ? prevState.moveCount + 1 : prevState.moveCount,
            turn : nextTurn
        }))     
    }

    /* Render each cell in a row */
    eachCell(cell){
        return (
             <Cell x={cell.x} y={cell.y} color={cell.color} highlighted={cell.hl} 
                onClick={this.clicked.bind(this, this.pointToKey(cell.x, cell.y))}
                key={this.pointToKey(cell.x, cell.y)} 
                piece={cell.piece ? cell.piece.name : ""}
                player={cell.piece ? cell.piece.player : ""}>
            </Cell> 
        )
    }

    render(){
        return (
            <div className="board">
                <ol >
                    { this.state.rows.map((row, i) => this.eachRow(row, i)) }
                </ol>
                {/* <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 		    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
            </div>

        )
    }
}

export default Board