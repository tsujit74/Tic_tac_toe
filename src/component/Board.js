import React, { useState } from 'react'
import Square from './Square'

export default function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(y) {
        if (squares[y] || gameWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[y] = 'X';
        }
        else {
            nextSquares[y] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function gameWinner() {
        const group = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < group.length; i++) {
            const [a, b, c] = group[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner = gameWinner(squares);
    let player;
    if (winner) {
        player = "Winner: " + winner ;
    }
    else{
        player='Next Player: ' + (xIsNext ? 'X' : 'O');
    }

    const reset =()=>{
        setSquares(Array(9).fill(null));
    }
    return (
        <>
            <div className="board-row">
                <div className="title">TIC-TAC-TOE</div>
                <div className="player">{player}</div>
                <div className='row'>
                    <Square value={squares[0]} squareClick={() => { handleClick(0) }} onClick={reset}/>
                    <Square value={squares[1]} squareClick={() => { handleClick(1) }} />
                    <Square value={squares[2]} squareClick={() => { handleClick(2) }} />
                </div>

                <div className='row'>
                    <Square value={squares[3]} squareClick={() => { handleClick(3) }} />
                    <Square value={squares[4]} squareClick={() => { handleClick(4) }} />
                    <Square value={squares[5]} squareClick={() => { handleClick(5) }} />
                </div>

                <div className='row'>
                    <Square value={squares[6]} squareClick={() => { handleClick(6) }} />
                    <Square value={squares[7]} squareClick={() => { handleClick(7) }} />
                    <Square value={squares[8]} squareClick={() => { handleClick(8) }} />
                </div>
                <button className='btn' type="reset" onClick={reset}>Reset</button>
            </div>
        </>
    )
}
