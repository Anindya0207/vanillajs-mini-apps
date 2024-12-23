class Logger {
  static log(msg) {
    let root = document.getElementById('root');
    let msgBlock = document.createElement('div');
    msgBlock.style.cssText = `border-bottom: 1px solid; padding: 5px 0; margin: 5px 0`;
    msgBlock.textContent = msg;
    root.appendChild(msgBlock);
  }
}

export default Logger;
