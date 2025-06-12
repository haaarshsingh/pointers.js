export type Config = Partial<{
  size: Size
  color: Color
  classNames: ClassNames
  speed: number
  scale: number
  pointer: Array<string>
  move: Array<string>
  loading: Array<string>
  zoomIn: Array<string>
  zoomOut: Array<string>
}>

export type Size = { outer: number; inner: number }

export type Color = { primary: string; accent: string }

export type ClassNames = { cursor: string; ring: string; spinner: string }
