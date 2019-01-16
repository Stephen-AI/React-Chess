import React, {Component} from 'react'
const design = {
    width: '60px',
    height: '60px'
}

class Cell extends Component{
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.state = {
            occupied : false,
            piece : 0,
            name: String.fromCharCode(65 + props.y) + (props.x + 1)
        }
        this.renderPiece = this.renderPiece.bind(this)
        this.renderEmpty = this.renderEmpty.bind(this)
    }

    componentDidUpdate(){

    }

    renderPiece(){
        let styl = {
            ...design, 
            backgroundColor: this.props.color,
            border: "1px solid black",
            borderColor: this.props.highlighted === "true" ? "blue" : "black"
        }
        let pref = this.props.player === "white" ? "white-" : ""
        let file_name = `${pref}${this.props.piece}.png`
        return (
            <div className="cell" style={styl} onClick={this.props.onClick}
                width="42" height="42">
                <img src={require(file_name)} alt={this.props.piece}></img>
            </div>
        )
    }

    renderEmpty(){
        let styl = {
                    ...design, 
                    backgroundColor: this.props.color,
                    border: "1px solid black",
                    borderColor: this.props.highlighted === "true" ? "blue" : "black"
                }
        return (
            <div className="cell" style={styl} onClick={this.props.onClick}
                ref={this.myRef}>
            </div>
        )
    }

    render(){
        return this.props.piece !== "" ? this.renderPiece() : this.renderEmpty()
    }
}

export default Cell