import type { Config, Size } from './types'

class CursorJS {
  private cursor: HTMLElement = document.createElement('div')
  private ring: HTMLElement = document.createElement('div')

  private cursorDot: HTMLElement = document.createElement('div')
  private cursorRing: HTMLElement = document.createElement('div')
  private cursorLoadingRing: HTMLElement = document.createElement('div')

  private zoomIn: HTMLElement = document.createElement('div')
  private zoomOut: HTMLElement = document.createElement('div')

  private arrowContainer: HTMLElement = document.createElement('div')
  private arrowUp: HTMLElement = document.createElement('div')
  private arrowDown: HTMLElement = document.createElement('div')

  private mouseX = 0
  private mouseY = 0
  private ringX = 0
  private ringY = 0

  private size: Size = { inner: 8, outer: 40 }
  private speed = 0.15
  private scale = 1.6

  constructor(config?: Config) {
    this.createCursorElements(config)
    this.addEventListeners(config)
    this.animateRing(config)
  }

  private createCursorElements(config?: Config) {
    this.cursor = document.createElement('div')
    this.ring = document.createElement('div')
    this.cursor.className = config?.classNames?.cursor || 'cursor'
    this.ring.className = config?.classNames?.ring || 'ring'

    this.cursorDot = document.createElement('div')
    this.cursorRing = document.createElement('div')
    this.cursorDot.className = 'cursor-dot'
    this.cursorRing.className = 'cursor-ring'

    this.cursorLoadingRing = document.createElement('div')
    this.cursorLoadingRing.className =
      config?.classNames?.spinner || 'cursor-loading-ring'

    this.zoomIn.className = 'cursor-zoom-in'
    this.zoomIn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.33337 11.6662C9.2789 11.6662 11.6667 9.27848 11.6667 6.33309C11.6667 3.38771 9.2789 1 6.33337 1C3.38783 1 1 3.38771 1 6.33309C1 9.27848 3.38783 11.6662 6.33337 11.6662Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.0001 12.9975L10.1001 10.0977" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.3335 4.33203V8.33185" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.33325 6.33203H8.33328" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    this.zoomOut.className = 'cursor-zoom-out'
    this.zoomOut.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.33337 11.6662C9.2789 11.6662 11.6667 9.27848 11.6667 6.33309C11.6667 3.38771 9.2789 1 6.33337 1C3.38783 1 1 3.38771 1 6.33309C1 9.27848 3.38783 11.6662 6.33337 11.6662Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.0001 12.9975L10.1001 10.0977" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.33325 6.33203H8.33328" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    this.arrowContainer = document.createElement('div')
    this.arrowContainer.className = 'cursor-arrow-container'

    this.arrowUp.className = 'cursor-arrow-up'
    this.arrowUp.innerHTML = `
      <svg width="10" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 6L6 1L1 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    this.arrowDown.className = 'cursor-arrow-down'
    this.arrowDown.innerHTML = `
      <svg width="10" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    document.body.append(this.cursor)
    document.body.append(this.ring)

    this.cursor.appendChild(this.cursorDot)

    this.ring.appendChild(this.cursorRing)
    this.ring.appendChild(this.cursorLoadingRing)

    this.cursor.appendChild(this.zoomIn)
    this.cursor.appendChild(this.zoomOut)

    this.cursor.appendChild(this.arrowContainer)
    this.arrowContainer.appendChild(this.arrowUp)
    this.arrowContainer.appendChild(this.arrowDown)

    const style = document.createElement('style')
    style.innerHTML = `
      * { cursor: none !important; }
      :root { --color-primary: #000; --color-accent: #2b7fff; }
      @media (prefers-color-scheme: dark) { :root { --color-primary: #fff; } }

      .cursor, .ring {
        position: fixed;
        z-index: 2147483647;
        pointer-events: none;
      }

      .cursor-zoom-in, .cursor-zoom-out {
        position: absolute;
        opacity: 0;
      }

      .cursor-arrow-container {
        opacity: 0;
      }

      .cursor-arrow-up { 
        animation: cursor-move-up 2s linear infinite;
      }

      .cursor-arrow-down { 
        animation: cursor-move-down 2s linear infinite;
      }
      
      .cursor-dot {
        position: absolute;
        width: ${config?.size?.inner || this.size.inner}px;
        height: ${config?.size?.inner || this.size.inner}px;
        background-color: ${config?.color?.primary || 'var(--color-primary)'};
        border-radius: 50%;
      }

      .ring {
        width: ${config?.size?.outer || this.size.outer}px;
        height: ${config?.size?.outer || this.size.outer}px;
      }

      .cursor-ring, .cursor-loading-ring {
        position: absolute;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        transition: transform 0.1s linear;
      }

      .cursor-ring {
        background-color: ${config?.color?.primary || 'var(--color-primary)'};
        opacity: 0.25;
      }

      .cursor-loading-ring {
        border: 2px solid ${config?.color?.accent || 'var(--color-accent)'};
        clip-path: polygon(50% 50%, 100% 0%, 100% 100%, 50% 50%);
        animation: loading 1s infinite linear;
        opacity: 0;
      }

      .fade-in {
        animation: fade-in 0.1s linear forwards;
      }
      
      .fade-out {
        animation: fade-out 0.1s linear forwards;
      }

      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes loading {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes cursor-move-up {
        0% { transform: translate(-2px, -30px); }
        50% { transform: translate(-2px, -33px); }
        100% { transform: translate(-2px, -30px); }
      }

      @keyframes cursor-move-down {
        0% { transform: translate(-2px, 25px); }
        50% { transform: translate(-2px, 28px); }
        100% { transform: translate(-2px, 25px); }
      }
    `
    document.head.appendChild(style)
  }

  private addEventListeners(config?: Config) {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY

      this.cursor.style.left = `${this.mouseX}px`
      this.cursor.style.top = `${this.mouseY}px`
    })

    document
      .querySelectorAll(
        config?.pointer?.join(', ') || 'a, button, [data-hover]'
      )
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.cursorRing.style.transform = `scale(${config?.scale || this.scale})`
        })
        el.addEventListener('mouseleave', () => {
          this.cursorRing.style.transform = 'scale(1)'
        })
      })

    document
      .querySelectorAll(config?.move?.join(', ') || '.move')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.arrowContainer.classList.add('fade-in')
          this.arrowContainer.classList.remove('fade-out')
        })
        el.addEventListener('mouseleave', () => {
          this.arrowContainer.classList.add('fade-out')
          this.arrowContainer.classList.remove('fade-in')
        })
      })

    document
      .querySelectorAll(config?.loading?.join(', ') || '.loading')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.cursorLoadingRing.style.transition = 'opacity 0.2s ease-in-out'
          this.cursorLoadingRing.style.opacity = '1'
        })
        el.addEventListener('mouseleave', () => {
          this.cursorLoadingRing.style.transition = 'opacity 0.2s ease-in-out'
          this.cursorLoadingRing.style.opacity = '0'
        })
      })

    document
      .querySelectorAll(config?.zoomIn?.join(', ') || '.zoom-in')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.zoomIn.style.opacity = '1'
          this.cursorDot.style.opacity = '0'
        })
        el.addEventListener('mouseleave', () => {
          this.zoomIn.style.opacity = '0'
          this.cursorDot.style.opacity = '1'
        })
      })

    document
      .querySelectorAll(config?.zoomOut?.join(', ') || '.zoom-out')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.zoomOut.style.opacity = '1'
          this.cursorDot.style.opacity = '0'
        })
        el.addEventListener('mouseleave', () => {
          this.zoomOut.style.opacity = '0'
          this.cursorDot.style.opacity = '1'
        })
      })
  }

  private animateRing(config?: Config) {
    const offset =
      ((config?.size?.outer || this.size.outer) -
        (config?.size?.inner || this.size.inner)) /
      2

    this.ringX += (this.mouseX - this.ringX) * (config?.speed || this.speed)
    this.ringY += (this.mouseY - this.ringY) * (config?.speed || this.speed)

    this.ring.style.left = `${this.ringX - offset}px`
    this.ring.style.top = `${this.ringY - offset}px`

    requestAnimationFrame(() => this.animateRing())
  }
}

export function initCursor(config?: Config) {
  new CursorJS(config)
}
