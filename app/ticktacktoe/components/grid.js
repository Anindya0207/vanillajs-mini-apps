import { renderCell } from './cell.js';

export const renderGrid = (container, dimensions, handleClick) => {
  container.innerHTML = '';
  const grid = document.createElement('div');
  const { row, col } = dimensions;
  grid.style.cssText = `display: grid; gap: 2px; grid-template-columns: repeat(${col}, 50px); grid-template-rows: repeat(${row}, 50px)`;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const cell = renderCell(handleClick, i, j);
      grid.appendChild(cell);
    }
  }
  container.appendChild(grid);
};
