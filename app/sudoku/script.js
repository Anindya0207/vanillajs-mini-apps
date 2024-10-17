
import {debounce} from '../utils.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  let ROWS = 9;
  let COLS = 9;
  let arr;
  let alreadyPlaying = false
  const resetGrid = () => {
    arr = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => '.')
    );
  }

  const createSudokuGrid = () => {
    resetGrid();
    arr = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]  
    renderGrid();
  }
  const canBePlaced = (row, col, val ) => {
    return !isPresentInRow(row, val)  && !isPresentInCol(col, val) && !isPresentInBox(row, col, val);
  }
  const isPresentInRow = ( row, val) => {
    for(let i = 0; i < COLS; i++) {
        if(arr[row][i] == val) return true;
    }
    return false
  }
  const isPresentInCol = ( col, val) => {
    for(let i = 0; i < ROWS; i++) {
        if(arr[i][col] == val) return true;
    }
    return false
  }
  const isPresentInBox = (row, col, val) => {
    const posR = row % 3;
    const posC = col % 3;
    let rowsToCheck = [];
    let colsToCheck = [];
    if(posR == 0) {
        rowsToCheck = [row, row + 1, row + 2]
    } else if (posR == 1) {
        rowsToCheck = [row-1, row, row + 1];
    } else if (posR == 2) {
        rowsToCheck = [row -2, row -1, row];
    } 
    if(posC == 0) {
        colsToCheck = [col, col + 1, col + 2]
    } else if (posC == 1) {
        colsToCheck = [col-1, col, col + 1];
    } else if (posC == 2) {
        colsToCheck = [col -2, col -1, col];
    } 
    for(let i = 0 ; i< rowsToCheck.length; i++) {
        for(let j = 0; j < colsToCheck.length; j++) {
            if(arr[rowsToCheck[i]][colsToCheck[j]] == val){
                return true
            }
        }
    }
    return false;
  }
  const renderGrid = (mode = 'prefill') => {
    const root = document.getElementById('root');
    root.innerHTML = ''
    const grid = document.createElement('div');
    grid.style.cssText = `display: grid; gap: 2px; grid-template-columns: repeat(${COLS}, 50px); grid-template-rows: repeat(${ROWS}, 50px);`;
    for(let i = 0; i < ROWS; i++) {
      for(let j= 0; j < COLS; j++) {
        const cell  = document.createElement('div');
        cell.style.cssText = `display: flex; border: 1px solid #000;justify-content: center; align-items: center`
        cell.dataset.rows = i;
        cell.dataset.cols = j;
        cell.setAttribute('id', `cell-${i}-${j}`)
        if(arr[i][j] != '.') {
          cell.textContent = arr[i][j]
          if(mode == 'prefill') {
            cell.style.background = '#000';
            cell.style.color = '#fff'
          }
        }
        grid.appendChild(cell);
      }
    }
    root.appendChild(grid)
  }
  const attachEventListenerOnActionBtns = () => {
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', debounce(() => {
        createSudokuGrid();
    }, 200))
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', debounce(() => {
        play();
    }, 200))
  }

  const delay = () => {
    return new Promise(res => {
        setTimeout(() => {
            res()
        ,0})
    })
  }
  const play = () => {
    if(alreadyPlaying) return;
    alreadyPlaying = true;
    const _calc = async (rowIndex, colIndex) => {
        if(rowIndex >= ROWS) return true;
        await delay();
        if(arr[rowIndex][colIndex] != '.') {
            if(colIndex < COLS -1) {
               return _calc(rowIndex, colIndex + 1)
            } else {
               return _calc(rowIndex+1, 0);
            }
        }
        for(var num = 1; num <= ROWS; num++) {
            if(!canBePlaced(rowIndex, colIndex, num)) continue;
            arr[rowIndex][colIndex] = num;
            const cell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
            cell.textContent = num;
           
            if(colIndex < COLS -1) {
                if(await _calc(rowIndex, colIndex + 1)) {
                    return true
                }
            } else {
                if(await _calc(rowIndex+1, 0)) {
                    return true
                }
            }
            arr[rowIndex][colIndex] = '.';
            cell.textContent = '';
        }
        return false;
    }
    _calc(0, 0);
    alreadyPlaying = false
  }
  const init = () => {
    createSudokuGrid();
    attachEventListenerOnActionBtns();
    console.log(arr)
  }
  init()
});
