import { createGrid } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    createGrid(4, 4, 'output');
});