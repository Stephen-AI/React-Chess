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
        this.color = white ? "yellow" : "brown"
        this.hl = "false"
        this.piece = new Piece(this.idPiece(x, y), this.idPlayer(x))
    }

    holdsPiece(){
        return this.piece.name !== ""
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
            prevClick : {}
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
        return a.x === b.x && a.y === b.y
    }

    /* When clicked cell should be highlighted red */
    clicked(key, e)
    {
        let k = this.keyToPoint(key)
        let c = this.state.rows[k.x][k.y]
        console.log(Queen.move(c, this.state.rows))
        if (this.sameCell(k, this.state.prevClick))
            return
        this.setState(prevState => ({
            cells: prevState.rows.map((row, i) => {
                if(this.state.prevClick.x === i){
                    row[this.state.prevClick.y].hl = "false"
                }
                if(k.x === i){
                    row[k.y].hl = "true"
                }
                return [...row]
            }),
            prevClick: {...k}
        }))     
    }

    /* Render each cell in a row */
    eachCell(cell){
        return (
             <Cell x={cell.x} y={cell.y} color={cell.color} highlighted={cell.hl} 
                onClick={this.clicked.bind(this, this.pointToKey(cell.x, cell.y))}
                key={this.pointToKey(cell.x, cell.y)} piece={cell.piece.name}
                player={cell.piece.player}>
            </Cell> 
        )
    }

    render(){
        return (
            <div className="board">
                <ol >
                    { this.state.rows.map((row, i) => this.eachRow(row, i)) }
                </ol>
                <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 		    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>

        )
    }
}

export default Board