declare module '*.less'
declare module '*.png'
declare module '*.yml'
declare module '*.jpg'
declare module '*.jpeg'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any
  export const ReactComponent: any
  export default content
}
