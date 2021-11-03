/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from 'react'
import { debounce } from 'lodash'
let passiveOptionAccessed = false
const options = {
  get passive() {
    return (passiveOptionAccessed = true)
  },
}

const supportsPassiveEvents = passiveOptionAccessed

const isTouchDevice =
  'ontouchstart' ||
  navigator.maxTouchPoints > 0 ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).msMaxTouchPoints > 0

interface ITouchEvent {
  clientX: number
  clientY: number
}

interface CustomTouch {
  preventDefault: () => void
  stopPropagation: () => void
  pointers?: Pointer[]
  delta: number
  scale?: number
  distance: number
  angleDeg: number
  deltaX?: number
  deltaY?: number
}

class Pointer {
  x: number
  y: number
  constructor(touch: ITouchEvent) {
    this.x = touch.clientX
    this.y = touch.clientY
  }
}
const getDistance = (p1: Pointer, p2: Pointer) => {
  const powX = Math.pow(p1.x - p2.x, 2)
  const powY = Math.pow(p1.y - p2.y, 2)

  return Math.sqrt(powX + powY)
}

const getAngleDeg = (p1: Pointer, p2: Pointer) => {
  return (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180) / Math.PI
}

export default function useGestures(
  ref: React.RefObject<HTMLElement>,
  handlers: {
    onSwipeLeft: () => void
    onSwipeRight: () => void
  }
  // options = {
  //   minDelta: 10,
  // }
) {
  const touchesRef = useRef<CustomTouch>()
  const gestureRef = useRef('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialTouches = useRef<any>(null)

  const getCurrentTouches = (
    originalEvent: TouchEvent,
    touches: ITouchEvent[],
    prevTouch: Pointer | CustomTouch | null | undefined
  ) => {
    const firstTouch = initialTouches.current

    if (touches.length === 2) {
      const pointer1 = new Pointer(touches[0])
      const pointer2 = new Pointer(touches[1])

      const distance = getDistance(pointer1, pointer2)
      return {
        preventDefault: originalEvent.preventDefault,
        stopPropagation: originalEvent.stopPropagation,
        pointers: [pointer1, pointer2],
        delta: prevTouch ? distance - (prevTouch as CustomTouch).distance : 0,
        scale: firstTouch ? distance / firstTouch.distance : 1,
        distance,
        angleDeg: getAngleDeg(pointer1, pointer2),
      }
    } else {
      const pointer = new Pointer(touches[0])

      return {
        preventDefault: originalEvent.preventDefault,
        stopPropagation: originalEvent.stopPropagation,
        ...pointer,
        deltaX: prevTouch ? pointer.x - (prevTouch as Pointer).x : 0,
        deltaY: prevTouch ? pointer.y - (prevTouch as Pointer).y : 0,
        delta: prevTouch ? getDistance(pointer, prevTouch as Pointer) : 0,
        distance: firstTouch ? getDistance(pointer, firstTouch) : 0,
        angleDeg: prevTouch ? getAngleDeg(pointer, prevTouch as Pointer) : 0,
      }
    }
  }

  const callHandler = useCallback(
    (eventName, event) => {
      if (
        eventName &&
        handlers[eventName] &&
        typeof handlers[eventName] === 'function'
      ) {
        handlers[eventName](event)
      }
    },
    [handlers]
  )

  const handleTouchStart = useCallback(
    (event) => {
      const currentTouches = getCurrentTouches(event, event.touches, null)

      touchesRef.current = currentTouches
      initialTouches.current = currentTouches

      if (event.touches.length === 2) {
        callHandler('onPinchStart', currentTouches)
      } else {
        callHandler('onPanStart', currentTouches)
      }
    },
    [callHandler]
  )

  const handleTouchMove = useCallback(
    (event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentTouches: any = getCurrentTouches(
        event,
        event.touches,
        touchesRef.current
      )

      touchesRef.current = currentTouches

      if (event.touches.length === 2) {
        callHandler('onPinchChanged', currentTouches)
      } else {
        callHandler('onPanMove', currentTouches)

        let eventName, theGesture

        if (
          Math.abs(currentTouches.deltaX) >= 10 &&
          Math.abs(currentTouches.deltaY) < 10
        ) {
          if (currentTouches.deltaX < 0) {
            eventName = 'onSwipeLeft'
            theGesture = 'swipeLeft'
          } else {
            eventName = 'onSwipeRight'
            theGesture = 'swipeRight'
          }
        } else if (
          Math.abs(currentTouches.deltaX) < 10 &&
          Math.abs(currentTouches.deltaY) >= 10
        ) {
          if (currentTouches.deltaY < 0) {
            eventName = 'onSwipeUp'
            theGesture = 'swipeUp'
          } else {
            eventName = 'onSwipeDown'
            theGesture = 'swipeDown'
          }
        } else {
          theGesture = ''
        }

        if (eventName) {
          debounce((eventName, touches, theGesture) => {
            callHandler(eventName, touches)

            gestureRef.current = theGesture
          }, 100)(eventName, touchesRef.current, theGesture)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callHandler, 10]
  )

  const handleTouchEnd = useCallback(
    (event) => {
      const currentTouches = getCurrentTouches(
        event,
        event.changedTouches,
        null
      )
      if (touchesRef?.current && touchesRef?.current?.pointers) {
        if (touchesRef?.current?.pointers?.length === 2) {
          callHandler('onPinchEnd', currentTouches)
        } else {
          callHandler('onPanEnd', currentTouches)
        }
      }

      if (gestureRef.current) {
        debounce((eventName, touches) => {
          callHandler(eventName, touches)
        }, 100)(
          `on${
            gestureRef.current.charAt(0).toUpperCase() +
            gestureRef.current.slice(1)
          }End`,
          currentTouches
        )
      }
    },
    [callHandler]
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element: any = ref?.current ? ref.current : ref

    if (!isTouchDevice) return

    if (
      !element ||
      !element.addEventListener ||
      typeof element.addEventListener !== 'function'
    ) {
      if (process?.env?.NODE_ENV === 'development') {
        console.warn(
          `useGestures - Missing a reference to a 'ref object' or the a instance of HTMLElement`
        )
      }
      return
    }

    element.addEventListener(
      'touchstart',
      handleTouchStart,
      supportsPassiveEvents ? { capture: false, passive: true } : false
    )
    element.addEventListener(
      'touchmove',
      handleTouchMove,
      supportsPassiveEvents ? { capture: false, passive: true } : false
    )
    element.addEventListener(
      'touchend',
      handleTouchEnd,
      supportsPassiveEvents ? { capture: false, passive: true } : false
    )

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    handlers,
    options,
    ref,
  ])
}
