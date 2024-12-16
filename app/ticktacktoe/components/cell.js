export const renderCell = (handleClick, i, j) => {
  const cell = document.createElement('div');
  cell.style.cssText = `display: flex; justify-content: center; align-items: center; border: 1px solid #000; cursor: pointer; font-size: 30px;`;
  cell.dataset.rows = i;
  cell.dataset.cols = j;
  cell.setAttribute('id', `cell-${i}-${j}`);
  cell.addEventListener('click', (ev) => handleClick(ev, i, j));
  return cell;
};
