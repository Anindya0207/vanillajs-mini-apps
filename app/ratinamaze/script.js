document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('root');
  let SIZE;
  let matrix = [];
  let PATH = [];
  let DIRARR = [];
  let alreadyMoving = false;

  const resetHighLightCell = () => {
    if (!PATH.length) return;
    for (let i = 0; i < PATH.length; i++) {
      const [r, c] = PATH[i];
      const cell = document.getElementById(`cell-${r}-${c}`);
      cell.style.background = '#fff';
    }
  };
  const delay = () => new Promise((res) => setTimeout(() => res(), 1000));

  const animateRat = async () => {
    let index = 0;
    for (const path of PATH) {
      const [r, c] = path;
      const cell = document.getElementById(`cell-${r}-${c}`);
      cell.style.background = 'green';
      cell.style.color = '#fff';
      switch (DIRARR[index]) {
        case 'U':
          cell.textContent = '↑';
          break;
        case 'D':
          cell.textContent = '↓';
          break;
        case 'R':
          cell.textContent = '→';
          break;
        case 'L':
          cell.textContent = '←';
          break;
      }
      index++;
      await delay();
    }
    const lastCell = document.getElementById(`cell-${SIZE - 1}-${SIZE - 1}`);
    lastCell.textContent = '🧀';
    lastCell.style.color = '#fff';
  };
  const moveRat = () => {
    if (alreadyMoving) {
      alert('Give the rat some time');
      return;
    }
    alreadyMoving = true;
    const _calc = (i, j, path, dirArr) => {
      if (i == SIZE - 1 && j == SIZE - 1) {
        PATH = path;
        DIRARR = dirArr;
        return true;
      }
      let dirs = [
        [0, 1, 'R'],
        [1, 0, 'D'],
        [0, -1, 'L'],
        [-1, 0, 'U'],
      ];
      for (const dir of dirs) {
        const [deltaR, deltaC, direction] = dir;
        let newR = deltaR + i;
        let newC = deltaC + j;
        if (
          newR >= 0 &&
          newC >= 0 &&
          newR < SIZE &&
          newC < SIZE &&
          matrix[newR][newC] == 0
        ) {
          matrix[newR][newC] = 1;
          if (
            _calc(newR, newC, [...path, [newR, newC]], [...dirArr, direction])
          ) {
            return true;
          }
          matrix[newR][newC] = 0;
        }
      }
      return false;
    };
    return _calc(0, 0, [[0, 0]], []);
  };
  const handlePlay = () => {
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
      const res = moveRat();
      alreadyMoving = false;
      if (!res) {
        alert('Sorry! no paths found to reach the destination');
        renderMaze();
        return;
      }
      console.log('You got a path', PATH);
      resetHighLightCell();
      animateRat();
    });
  };
  const validategridsize = (val) =>
    typeof val == 'number' && val > 0 && val <= 10;

  const shouldBlock = () => {
    return Math.floor(Math.random() * 4) + 1 == 1;
  };
  const renderMaze = () => {
    const gridSizeInput = document.getElementById('gridSize');
    SIZE = Number(gridSizeInput.value);
    matrix = Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => 0),
    );
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.style.cssText = `display: grid; gap: 2px; grid-template-columns:repeat(${SIZE}, 50px); grid-template-rows: repeat(${SIZE}, 50px)`;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const cell = document.createElement('div');
        cell.setAttribute('id', `cell-${i}-${j}`);
        cell.dataset.rows = i;
        cell.dataset.cols = j;
        cell.style.cssText = `display: flex; justify-content: center; align-items: center; border: 1px solid #000`;
        if (
          !((i == 0 && j == 0) || (i == SIZE - 1 && j == SIZE - 1)) &&
          shouldBlock()
        ) {
          matrix[i][j] = -1;
          cell.style.background = '#000';
        }
        grid.appendChild(cell);
      }
    }
    container.appendChild(grid);
  };
  const handleGridInput = () => {
    const gridSizeInput = document.getElementById('gridSize');
    gridSizeInput.addEventListener('change', (event) => {
      const val = event.target.value;
      const errDiv = document.getElementById('gridSizeInputError');
      if (validategridsize(Number(val))) {
        errDiv.textContent = '';
      } else {
        errDiv.textContent = 'Please enter a size between [0, 10]';
      }
    });
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
  const init = () => {
    container.innerHTML = '';
    handleGridInput();
    // renderMaze();
    handlePlay();
  };
  init();
});
