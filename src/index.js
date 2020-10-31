import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button 
        className = "square" 
        // When Square is clicked, the onClick() function provided by Board is called
        onClick = {props.onClick} 
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // Creating an array of size 9 to store all square's current markers (X, O, or null)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  renderSquare(i) {
    return (
      <Square 
        // Passing an 'X', 'O', or 'null' to each square based on the board's state
        value={this.state.squares[i]} 
        // Passing a function called onClick that Square will call when clicked, thus calling handleClick() here in Board 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  // Creating a handlClick() function that will be called upon clicking a square 
  handleClick(i) {
    // Creating a copy of the squares array to modify instead of modifying the exisiting array
    const squares = this.state.squares.slice();

    // Ignoring a click if there is a winner or if the selected space was already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}