document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  let ROW;
  let COL;
  let defaultMatrix = [
    [4, 1, 2],
    [3, 6, 1],
    [1, 6, 6],
    [3, 1, 2],
  ];
  let matrix = [];
  let MAXCHOCOLATE = -Infinity;
  let PATH = [];
  var renderingMaze = false;
  var mazeRendered = false;
  var autoPlayOn = false;

  const delay = () => new Promise((res) => setTimeout(() => res(), 1000));

  const reset = () => {
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        const cell = document.getElementById(`cell-${i}-${j}`);
        cell.style.background = '#fff';
      }
    }
    const r1ResultDiv = document.getElementById('robo1Result');
    r1ResultDiv.textContent = '';
    const r2ResultDiv = document.getElementById('robo2Result');
    r2ResultDiv.textContent = '';
    const totalResult = document.getElementById('totalResult');
    totalResult.textContent = '';
  };
  const highLightPath = async () => {
    const [robo1Path, robo2Path] = PATH;
    let index = 0,
      robo1Chocolate = 0,
      robo2Chocolate = 0;
    for (const r1 of robo1Path) {
      const r1Cor = robo1Path[index];
      const r2Cor = robo2Path[index];
      const [r1r, r1c] = r1Cor;
      const [r2r, r2c] = r2Cor;
      const cell1 = document.getElementById(`cell-${r1r}-${r1c}`);
      const cell2 = document.getElementById(`cell-${r2r}-${r2c}`);
      if (r1c == r2c) {
        robo1Chocolate += matrix[r1r][r1c];
        cell1.style.background = '#c8dbea';
      } else {
        robo1Chocolate += matrix[r1r][r1c];
        robo2Chocolate += matrix[r2r][r2c];
        cell1.style.background = '#bdf7c0';
        cell2.style.background = '#eac8cb';
      }
      await delay();
      index++;
    }
    const r1ResultDiv = document.getElementById('robo1Result');
    r1ResultDiv.textContent = `Optimal collection by robot 1 = ${robo1Chocolate}`;
    const r2ResultDiv = document.getElementById('robo2Result');
    r2ResultDiv.textContent = `Optimal collection by robot 2 = ${robo2Chocolate}`;
    const totalResult = document.getElementById('totalResult');
    totalResult.textContent = `Optimal collection by both the robots = ${MAXCHOCOLATE}`;
    if (autoPlayOn) {
      autoPlayOn = false;
    }
  };
  const autoPlay = () => {
    if (autoPlayOn) {
      alert('Auto play is on, please wait');
      return;
    }
    autoPlayOn = true;
    reset();
    const _calc = (i, j1, j2, sum, path1, path2) => {
      if (i < 0 || i >= ROW || j1 < 0 || j1 >= COL || j2 < 0 || j2 >= COL)
        return -Infinity;
      if (i == ROW - 1) {
        let cellVal = 0;
        if (j1 == j2) {
          cellVal = matrix[i][j1];
        } else {
          cellVal = matrix[i][j1] + matrix[i][j2];
        }
        if (cellVal + sum > MAXCHOCOLATE) {
          MAXCHOCOLATE = cellVal + sum;
          PATH = [path1, path2];
        }
        return;
      }
      for (let dj1 = -1; dj1 <= 1; dj1++) {
        for (let dj2 = -1; dj2 <= 1; dj2++) {
          let cellVal1 = 0;
          if (j1 == j2) {
            cellVal1 = matrix[i][j1];
          } else {
            cellVal1 = matrix[i][j1] + matrix[i][j2];
          }
          _calc(
            i + 1,
            j1 + dj1,
            j2 + dj2,
            sum + cellVal1,
            [...path1, [i + 1, j1 + dj1]],
            [...path2, [i + 1, j2 + dj2]],
          );
        }
      }
    };
    _calc(0, 0, COL - 1, 0, [[0, 0]], [[0, COL - 1]]);
    console.log('Path', PATH);
    console.log('Max', MAXCHOCOLATE);
    highLightPath();
  };

  const getRandomValue = () => Math.floor(Math.random() * 9) + 1;
  const validateInputs = () => {
    const sanitiseInput = (val) =>
      typeof val == 'number' && val > 0 && val <= 10;
    const row = document.getElementById('gridRow');
    const col = document.getElementById('gridColumn');
    const rowVal = Number(row.value);
    const colVal = Number(col.value);
    return sanitiseInput(rowVal) && sanitiseInput(colVal);
  };
  const renderMaze = () => {
    if (!validateInputs()) {
      alert('Please provide row and col from [0, 10]');
      return;
    }

    ROW = Number(document.getElementById('gridRow').value);
    COL = Number(document.getElementById('gridColumn').value);
    if (autoPlayOn) {
      alert('Auto play is on, please wait');
      return;
    }
    if (renderingMaze) {
      alert('Already rendering the maze, please wait');
      return;
    }
    renderingMaze = true;
    container.innerHTML = '';
    const grid = document.createElement('div');
    matrix = Array.from({ length: ROW }, () =>
      Array.from({ length: COL }, () => undefined),
    );
    grid.style.cssText = `display: grid; gap: 2px; grid-template-rows: repeat(${ROW}, 50px); grid-template-columns: repeat(${COL}, 50px);`;
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        const cell = document.createElement('div');
        cell.setAttribute('id', `cell-${i}-${j}`);
        cell.dataset.rows = i;
        cell.dataset.cols = j;
        cell.style.cssText = `display: flex; justify-content: center; align-items: center; border: 1px solid #000`;
        const cellVal = getRandomValue();
        matrix[i][j] = cellVal;
        cell.textContent = matrix[i][j];
        grid.appendChild(cell);
      }
    }
    container.appendChild(grid);
    mazeRendered = true;
    renderingMaze = false;
  };
  const handleGenerateGrid = () => {
    const generateMaze = document.getElementById('generateMaze');
    generateMaze.addEventListener('click', () => {
      renderMaze();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        renderMaze();
      }
    });
  };
  const handleAutoPlay = () => {
    document.getElementById('playBtn').addEventListener('click', () => {
      if (!mazeRendered) {
        alert('Maze is not yet rendered, please generate the maze first');
        return;
      }
      autoPlay();
    });
  };
  const handleResetBtn = () => {
    document.getElementById('resetBtn').addEventListener('click', () => {
      reset();
      matrix = [];
      MAXCHOCOLATE = -Infinity;
      PATH = [];
      renderingMaze = false;
      mazeRendered = false;
      autoPlayOn = false;
      container.innerHTML = '';
    });
  };
  const init = () => {
    handleGenerateGrid();
    handleAutoPlay();
    handleResetBtn();
  };
  init();
});
