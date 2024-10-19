export const createGrid = (rows, cols, containerId) => {
  const root = document.getElementById(containerId);
  root.innerHTML = '';
  const grid = document.createElement('div');
  grid.style.cssText = `display: grid; gap: 2px; grid-template-columns: repeat(${cols}, 50px); grid-template-rows: repeat(${rows}, 50px);`;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.style.cssText = `display: flex; border: 1px solid #000;justify-content: center; align-items: center`;
      cell.dataset.rows = i;
      cell.dataset.cols = j;
      if (shouldFill()) {
        cell.textContent = j + 1;
      }
      grid.appendChild(cell);
    }
  }
  root.appendChild(grid);
};

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

export const debounce = (fn, delay) => {
  let timeoutId = null;
  return (...args) => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const throttle = (fn, delay) => {
  let isThrottle = false;
  return (...args) => {
    if (isThrottle) return;
    fn(...args);
    isThrottle = true;
    setTimeout(() => (isThrottle = false), delay);
  };
};
