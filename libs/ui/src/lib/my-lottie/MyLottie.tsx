import dynamic from 'next/dynamic'

export interface MyLottieProps {
  options: {
    loop?: boolean
    autoplay?: boolean
    animationData: unknown
    renderSettings?: {
      [key: string]: unknown
    }
    eventListeners?: {
      eventName:
        | 'complete'
        | 'loopComplete'
        | 'enterFrame'
        | 'segmentStart'
        | 'config_ready'
        | 'data_ready'
        | 'data_failed'
        | 'loaded_images'
        | 'DOMLoaded'
        | 'destroy'
      callback: (arg0?: unknown) => void
    }[]
  }
  eventListeners?: unknown[]
  height: string | number
  width: string | number
}
export const MyLottie = dynamic<MyLottieProps>(() => import('react-lottie'), {
  ssr: false,
})

export default MyLottie
