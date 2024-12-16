import TicTacToe from './controller/game.js';
import { validateInputs } from './utils/utils.js';
import { renderGrid } from './components/grid.js';

const container = document.getElementById('root');

class Game {
  constructor() {
    if (Game.instance) return Game.instance;
    Game.instance = this;
    this.controller = new TicTacToe();
  }

  changeTurnMessage = () => {
    const currentPlayer = this.controller.getCurrentPlayer();
    document.getElementById(
      'turnMessage',
    ).textContent = `It's your turn ${currentPlayer}`;
  };

  handleVictory = () => {
    const currentPlayer = this.controller.getCurrentPlayer();
    document.getElementById('result').textContent = `${currentPlayer} WINS!!!`;
    document.getElementById('turnMessage').textContent = '';
    const PATH = this.controller.getWinPath();
    for (let i = 0; i < PATH.length; i++) {
      const [r, c] = PATH[i];
      const cell = document.getElementById(`cell-${r}-${c}`);
      cell.style.background = '#cdffda';
    }
    this.controller.setPlaying(false);
  };

  onCellClick = (ev, i, j) => {
    if (!this.controller.playing) {
      alert('Start the game first');
      return;
    }
    ev.preventDefault();
    const cell = document.getElementById(`cell-${i}-${j}`);
    const res = this.controller.makeMove(i, j);
    if (res.victory) {
      cell.textContent = res.sign;
      setTimeout(() => this.handleVictory(), 100);
    } else if (res.sign) {
      cell.textContent = res.sign;
      this.changeTurnMessage();
    }
  };

  renderMaze = () => {
    if (this.controller.isPlaying()) {
      alert('Game is already ON!');
      return;
    }

    const gridSize = document.getElementById('gridSize');
    const lineLength = document.getElementById('lineLength');
    const gridSizeVal = Number(gridSize.value);
    const lineLengthVal = Number(lineLength.value);
    if (!validateInputs(gridSizeVal, lineLengthVal)) {
      alert(
        'Please enter grid within [0, 10] and match line of max length of grid',
      );
      return;
    }
    this.controller.setDimensions(gridSizeVal, gridSizeVal);
    this.controller.setLineLength(lineLengthVal);
    this.controller.setPlaying(true);
    renderGrid(container, this.controller.getDimensions(), this.onCellClick);
  };

  reset = () => {
    container.innerHTML = '';
    document.getElementById('gridSize').value = '';
    document.getElementById('lineLength').value = '';
    document.getElementById('result').textContent = '';
    this.controller = new TicTacToe();
  };

  attachEventListeners = () => {
    const generateBtn = document.getElementById('generateMaze');
    generateBtn.addEventListener('click', () => {
      this.renderMaze();
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key == 'Enter') {
        ev.preventDefault();
        renderMaze();
      }
    });
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
      this.reset();
    });
  };

  init = () => {
    this.attachEventListeners();
  };
}

const game = new Game();
game.init();
