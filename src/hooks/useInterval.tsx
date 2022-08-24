import { useEffect, useRef } from "react"

export function useInterval(callback: () => any, delay: number): void {
  const savedCallback = useRef()

  useEffect(() => {
    // @ts-ignore
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
