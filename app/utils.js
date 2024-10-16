export function createGrid(rows, cols, containerId) {
  const container = document.getElementById(containerId);
  const grid = document.createElement('div');
  grid.style.cssText = `display: grid; gap: 2px; grid-template-rows: repeat(${rows}, 50px); grid-template-columns: repeat(${cols}, 50px)`;
  for(let i  = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.style.cssText = `border: 1px solid #000;display: flex; align-items: center; justify-content: center; `
      cell.dataset.rows = i;
      cell.dataset.cols = j;
      cell.textContent = Math.floor(Math.random() * 9) + 1;
      grid.appendChild(cell);
    }
  }
  container.appendChild(grid);
}

export async function* fetchData(url) {
  let page = 0;
  while (true) {
    let res = await fetch(url + page);
    let data = await res.json();
    if (data.length == 0) break;
    page++;
    yield data;
  }
}
