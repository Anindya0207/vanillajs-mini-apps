export function createGrid(rows, cols, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.style.cssText = `display: grid; gap: 2px; grid-template-rows: repeat(${rows}, 50px); grid-template-columns: repeat(${cols}, 50px)`
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.style.cssText = `border: 1px solid black; display: flex; alignItems: center; justifyContent: center;`
            cell.dataset.row = i;
            cell.dataset.col = j;
            grid.appendChild(cell);
        }
    }
    container.appendChild(grid)
}