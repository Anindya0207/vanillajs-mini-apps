import { CROSS, CIRCLE } from '../utils/constants.js';

class TicTacToe {
  constructor() {
    this.row = 0;
    this.col = 0;
    this.lineLength = 0;
    this.playing = false;
    this.playerOneSign = '';
    this.playerTwoSign = '';
    this.currentPlayer = 'Player 1';
    this.setRandomSign();
    this.matrix;
    this.winPath = [];
  }
  setDimensions = (row, col) => {
    this.row = row;
    this.col = col;
    this.matrix = Array.from({ length: row }, () =>
      Array.from({ length: col }, () => -1),
    );
  };
  getDimensions = () => ({ row: this.row, col: this.col });
  setLineLength = (len) => (this.lineLength = len);
  getLineLength = () => this.lineLength;
  setPlaying = (playing) => (this.playing = playing);
  isPlaying = () => this.playing;
  getWinPath = () => this.winPath;
  setRandomSign = () => {
    if (Math.round(Math.random() * 1) == 1) {
      this.playerOneSign = CROSS;
      this.playerTwoSign = CIRCLE;
    } else {
      this.playerTwoSign = CROSS;
      this.playerOneSign = CIRCLE;
    }
  };
  setCurrentPlayer = (player) => (this.currentPlayer = player);
  getCurrentPlayer = () => this.currentPlayer;
  getPlayerOneSign = () => this.playerOneSign;
  getPlayerTwoSign = () => this.playerTwoSign;
  makeMove = (i, j) => {
    if (this.matrix[i][j] !== -1) return;
    if (this.currentPlayer === 'Player 1') {
      this.matrix[i][j] = 1;
      let sign = this.getPlayerOneSign();
      const isWin = this.detectWinner(i, j);
      if (isWin) {
        return { victory: true, sign };
      } else {
        this.currentPlayer = 'Player 2';
        return { victory: false, sign };
      }
    } else {
      this.matrix[i][j] = 0;
      let sign = this.getPlayerTwoSign();
      const isWin = this.detectWinner(i, j);
      if (isWin) {
        return { victory: true };
      } else {
        this.currentPlayer = 'Player 1';
        return { victory: false, sign };
      }
    }
  };
  detectWinner = (i, j) => {
    const _traverse = (_i, _j, dir) => {
      if (_i < 0 || _i >= this.row || _j < 0 || _j >= this.col) return [];
      if (this.matrix[_i][_j] !== 0 && this.currentPlayer == 'Player 2')
        return [];
      if (this.matrix[_i][_j] !== 1 && this.currentPlayer == 'Player 1')
        return [];
      let path = [];
      switch (dir) {
        case 'U':
          path = [[_i, _j], ..._traverse(_i - 1, _j, dir)];
          break;
        case 'D':
          path = [[_i, _j], ..._traverse(_i + 1, _j, dir)];
          break;
        case 'L':
          path = [[_i, _j], ..._traverse(_i, _j - 1, dir)];
          break;
        case 'R':
          path = [[_i, _j], ..._traverse(_i, _j + 1, dir)];
          break;
        case 'UL':
          path = [[_i, _j], ..._traverse(_i - 1, _j - 1, dir)];
          break;
        case 'DR':
          path = [[_i, _j], ..._traverse(_i + 1, _j + 1, dir)];
          break;
        case 'UR':
          path = [[_i, _j], ..._traverse(_i - 1, _j + 1, dir)];
          break;
        case 'DL':
          path = [[_i, _j], ..._traverse(_i + 1, _j - 1, dir)];
          break;
      }
      return path;
    };
    let op11 = _traverse(i, j, 'U');
    let op12 = _traverse(i, j, 'D');
    let op1 = op11.length + op12.length - 1;
    if (op1 >= this.lineLength) {
      this.winPath = [...op11, ...op12];
      return true;
    }
    let op21 = _traverse(i, j, 'L');
    let op22 = _traverse(i, j, 'R');
    let op2 = op21.length + op22.length - 1;
    if (op2 >= this.lineLength) {
      this.winPath = [...op21, ...op22];
      return true;
    }
    let op31 = _traverse(i, j, 'UL');
    let op32 = _traverse(i, j, 'DR');
    let op3 = op31.length + op32.length - 1;
    if (op3 >= this.lineLength) {
      this.winPath = [...op31, ...op32];
      return true;
    }
    let op41 = _traverse(i, j, 'UR');
    let op42 = _traverse(i, j, 'DL');
    let op4 = op41.length + op42.length - 1;
    if (op4 >= this.lineLength) {
      this.winPath = [...op41, ...op42];
      return true;
    }
    return false;
  };
}

export default TicTacToe;
