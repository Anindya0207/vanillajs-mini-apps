
window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const itemWidth = 600;
    let intervalId
    let offset = itemWidth;
    const firstClone = container.children[0].cloneNode(true);
    const lastClone = container.children[container.children.length - 1].cloneNode(true)
    container.append(firstClone);
    container.prepend(lastClone);
    const scrollWidth = container.scrollWidth;
    container.scrollLeft = itemWidth;
    const autoScroll = () => {
      offset += itemWidth;
      container.scrollTo({left: offset, behavior: 'smooth'})
      if(offset >= scrollWidth - itemWidth) {
        setTimeout(() => {
          container.scrollLeft = itemWidth;
          offset = itemWidth;
        }, 500)    
       
      } else if(offset <= 0) {
        setTimeout(() => {
        container.scrollLeft = scrollWidth - (2 * itemWidth);
        offset= scrollWidth - (2 * itemWidth);
      }, 500)    
      }
    };
    container.addEventListener('mouseenter', () => {
        intervalId && clearInterval(intervalId);
    })
    container.addEventListener('mouseleave', () => {
        intervalId = setInterval(autoScroll, 2000);
    })
    intervalId = setInterval(autoScroll, 2000);
  })