document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  let GRID_SIZE;
  let LINE_LENGTH;
  let matrix = [];
  let alreadyPlaying = false;
  let currentPlayer;
  let playerTwoSign;
  let playerOneSign;
  let cross = '✕';
  let circle = '❍';
  let PATH = [];
  let readyToPlay = false;

  const handleVictory = () => {
    document.getElementById('result').textContent = `${currentPlayer} WINS!!!`;
    document.getElementById('turnMessage').textContent = '';
    for (let i = 0; i < PATH.length; i++) {
      const [r, c] = PATH[i];
      const cell = document.getElementById(`cell-${r}-${c}`);
      cell.style.background = '#cdffda';
    }
    alreadyPlaying = false;
  };
  const reset = () => {
    container.innerHTML = '';
    document.getElementById('gridSize').value = '';
    document.getElementById('lineLength').value = '';
    currentPlayer = null;
    playerTwoSign = '';
    playerOneSign = '';
    alreadyPlaying = false;
    matrix = [];
    PATH = [];
    GRID_SIZE = undefined;
    LINE_LENGTH = undefined;
    readyToPlay = false;
  };

  const detectWinner = (i, j, matchVal) => {
    let colWiseC = [[i, j]];
    for (let k = i - 1; k >= 0; k--) {
      if (matrix[k][j] == matchVal) {
        colWiseC.push([k, j]);
      } else {
        break;
      }
    }
    for (let k = i + 1; k < GRID_SIZE; k++) {
      if (matrix[k][j] == matchVal) {
        colWiseC.push([k, j]);
      } else {
        break;
      }
    }
    if (colWiseC.length >= LINE_LENGTH) {
      PATH = colWiseC;
      return true;
    }
    let rowWiseC = [[i, j]];
    for (let k = j - 1; k >= 0; k--) {
      if (matrix[i][k] == matchVal) {
        rowWiseC.push([i, k]);
      } else {
        break;
      }
    }
    for (let k = j + 1; k < GRID_SIZE; k++) {
      if (matrix[i][k] == matchVal) {
        rowWiseC.push([i, k]);
      } else {
        break;
      }
    }
    if (rowWiseC.length >= LINE_LENGTH) {
      PATH = rowWiseC;
      return true;
    }
    let leftDiagnal = [[i, j]];
    let k = i - 1,
      m = j - 1;
    while (k >= 0 && m >= 0) {
      if (matrix[k][m] == matchVal) {
        leftDiagnal.push([k, m]);
        k--;
        m--;
      } else {
        break;
      }
    }
    k = i + 1;
    m = j + 1;
    while (k < GRID_SIZE && m < GRID_SIZE) {
      if (matrix[k][m] == matchVal) {
        leftDiagnal.push([k, m]);
        k++;
        m++;
      } else {
        break;
      }
    }
    if (leftDiagnal.length >= LINE_LENGTH) {
      PATH = leftDiagnal;
      return true;
    }
    let rightDiagnal = [[i, j]];
    k = i - 1;
    m = j + 1;
    while (k >= 0 && m < GRID_SIZE) {
      if (matrix[k][m] == matchVal) {
        rightDiagnal.push([k, m]);
        k--;
        m++;
      } else {
        break;
      }
    }
    k = i + 1;
    m = j - 1;
    while (k < GRID_SIZE && m >= 0) {
      if (matrix[k][m] == matchVal) {
        rightDiagnal.push([k, m]);
        k++;
        m--;
      } else {
        break;
      }
    }
    if (rightDiagnal.length >= LINE_LENGTH) {
      PATH = rightDiagnal;
      return true;
    }
    return false;
  };
  const onCellClick = (ev, i, j) => {
    if (!alreadyPlaying) {
      alert('Start the game first');
      return;
    }
    ev.preventDefault();
    if (matrix[i][j] != -1) return;
    const cell = document.getElementById(`cell-${i}-${j}`);
    if (currentPlayer == 'PLAYER_1') {
      matrix[i][j] = 1;
      cell.textContent = playerOneSign;
      const res = detectWinner(i, j, 1);
      if (res) {
        handleVictory();
        return;
      } else {
        currentPlayer = 'PLAYER_2';
      }
    } else {
      matrix[i][j] = 0;
      cell.textContent = playerTwoSign;
      const res = detectWinner(i, j, 0);
      if (res) {
        handleVictory();
        return;
      } else {
        currentPlayer = 'PLAYER_1';
      }
    }
    changeTurnMessage();
  };
  const setRandomSign = () => {
    if (Math.round(Math.random() * 1) == 1) {
      playerOneSign = cross;
      playerTwoSign = circle;
    } else {
      playerTwoSign = cross;
      playerOneSign = circle;
    }
  };
  const changeTurnMessage = () => {
    document.getElementById(
      'turnMessage',
    ).textContent = `It's your turn ${currentPlayer}`;
  };
  const play = () => {
    if (!readyToPlay) {
      alert('Generate the board first');
      return;
    }
    if (alreadyPlaying) {
      alert('Game is already ON!');
      return;
    }
    if (PATH.length > 0) {
      // finished a game
      matrix = Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => -1),
      );
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const cell = document.getElementById(`cell-${i}-${j}`);
          cell.textContent = '';
          cell.style.background = '#fff';
        }
      }
      PATH = [];
      document.getElementById('result').textContent = '';
    }
    alreadyPlaying = true;
    currentPlayer = 'PLAYER_1';
    setRandomSign();
    changeTurnMessage();
  };

  const renderGrid = () => {
    container.innerHTML = '';
    const grid = document.createElement('div');
    matrix = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => -1),
    );
    grid.style.cssText = `display: grid; gap: 2px; grid-template-columns: repeat(${GRID_SIZE}, 50px); grid-template-rows: repeat(${GRID_SIZE}, 50px)`;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const cell = document.createElement('div');
        cell.style.cssText = `display: flex; justify-content: center; align-items: center; border: 1px solid #000; cursor: pointer; font-size: 30px`;
        cell.dataset.rows = i;
        cell.dataset.cols = j;
        cell.setAttribute('id', `cell-${i}-${j}`);
        cell.addEventListener('click', (ev) => onCellClick(ev, i, j));
        grid.appendChild(cell);
      }
    }
    container.appendChild(grid);
    readyToPlay = true;
  };

  const sanitise = (val) => typeof val == 'number' && val > 0 && val <= 10;

  const validateInputs = () => {
    const gridSize = document.getElementById('gridSize');
    const lineLength = document.getElementById('lineLength');
    const gridSizeVal = Number(gridSize.value);
    const lineLengthVal = Number(lineLength.value);
    if (
      sanitise(gridSizeVal) &&
      sanitise(lineLengthVal) &&
      lineLengthVal >= 3 &&
      lineLengthVal <= gridSizeVal
    ) {
      GRID_SIZE = gridSizeVal;
      LINE_LENGTH = lineLengthVal;
      return true;
    }
    return false;
  };

  const renderMaze = () => {
    if (alreadyPlaying) {
      alert('Game is already ON!');
      return;
    }
    if (!validateInputs()) {
      alert(
        'Please enter grid within [0, 10] and match line of max length of grid',
      );
    }
    renderGrid();
  };

  const handleGenerateMaze = () => {
    const generateBtn = document.getElementById('generateMaze');
    generateBtn.addEventListener('click', () => {
      renderMaze();
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key == 'Enter') {
        ev.preventDefault();
        renderMaze();
      }
    });
  };

  const handlePlay = () => {
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
      play();
    });
  };

  const handleReset = () => {
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
      reset();
    });
  };
  const init = () => {
    handleGenerateMaze();
    handlePlay();
    handleReset();
  };

  init();
});
