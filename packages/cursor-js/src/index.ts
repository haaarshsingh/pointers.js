export default (() => {
  interface CursorElement extends HTMLElement {
    style: CSSStyleDeclaration;
  }

  function initCursor(selectors: string[]): void {
    const cursor: CursorElement = document.createElement('div') as CursorElement;
    cursor.style.position = 'absolute';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.backgroundColor = 'black';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.transition = 'transform 0.2s ease';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
    });

    selectors.forEach((selector: string) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element: HTMLElement) => {
        element.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(3)';
        });
        element.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
        });
      });
    });
  }

  // @ts-expect-error - Expose the function to the window object
  window.initCursor = initCursor;
})();