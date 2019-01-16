export const CELL_CLICKED = 'CELL_CLICKED'
export const PIECE_MOVED = 'PIECE_MOVED'
export const CHECk = "CHECK"

export const cellClicked = cell => ({ 
    type : CELL_CLICKED,
    cell
})

export const pieceMoved = (to, from) => ({
    type : PIECE_MOVED,
    to,
    from
})

export const check = perp => {
    type : CHECk,
    perp
}