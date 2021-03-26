import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  flipCell(y, x) { // helper method for flipCellsAround()
    // if this coord is actually on board, flip it
    if (x >= 0 && x < this.props.ncols && y >= 0 && y < this.props.nrows) {
      this.state.board[y][x] = !this.state.board[y][x];
    }
  }

  flipCellsAround(coord) {

    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    // TODO: flip this cell and the cells around it
    this.flipCell(y, x);
    this.flipCell(y, x - 1);
    this.flipCell(y, x + 1);
    this.flipCell(y - 1, x);
    this.flipCell(y + 1, x);
    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board, hasWon });
  }

  boardDisplay() {
    let tableBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`;
        row.push(<Cell key={coord} isLit={this.state.board[i][j]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }
      tableBoard.push(<tr key={i}>{row}</tr>);
    }
    return tableBoard;
  }

  /** Render game board or winning message. */
  render() {
    return (
      // if the game is won, just show a winning msg & render nothing else
      // TODO
      // make table board
      // TODO
      <div>
        {this.state.hasWon ? (
          <div className="Winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>) : (
          <div>
            <div className="board-title">
              <div className="neon-orange">LIGHTs</div>
              <div className="neon-blue">OUT</div>
            </div>
            <table className='Board'>
              <tbody>
                {this.boardDisplay()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default Board;
