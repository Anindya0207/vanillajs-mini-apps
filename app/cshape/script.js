document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  let GRID_SIZE = 3;
  let queue = [];

  const onCellClick = (ev, i, j) => {
    const cell = document.getElementById(`cell-${i}-${j}`);
    cell.style.backgroundColor = 'green';
    queue.push({ i, j });
    if (queue.length === GRID_SIZE * 3 - 2) {
      reset();
    }
  };

  const reset = () => {
    let counter = 0;
    while (!!queue.length) {
      const { i, j } = queue.shift();
      const cell = document.getElementById(`cell-${i}-${j}`);
      setTimeout(() => {
        cell.style.backgroundColor = '';
      }, counter * 1000);
      counter++;
    }
  };

  const renderGrid = () => {
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.style.cssText = `display: grid; gap: 2px; grid-template-columns: repeat(${GRID_SIZE}, 50px); grid-template-rows: repeat(${GRID_SIZE}, 50px)`;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const cell = document.createElement('div');
        cell.style.cssText = `display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 30px`;
        cell.dataset.rows = i;
        cell.dataset.cols = j;
        cell.setAttribute('id', `cell-${i}-${j}`);
        if (
          ((i > 0 || i < GRID_SIZE - 1) && j == 0) ||
          i == 0 ||
          i == GRID_SIZE - 1
        ) {
          cell.style.border = '1px solid #000';
          cell.addEventListener('click', (ev) => onCellClick(ev, i, j));
        }
        grid.appendChild(cell);
        continue;
      }
    }
    container.appendChild(grid);
    readyToPlay = true;
  };

  const init = () => {
    renderGrid();
  };

  init();
});
