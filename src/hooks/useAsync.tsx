import { useCallback, useLayoutEffect, useReducer, useRef } from "react"

function useSafeDispatch(dispatch: any) {
  const mounted = useRef(false)

  // @ts-ignore
  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  // @ts-ignore
  return useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch]) // eslint-disable-line
}

export interface UseAsyncProps {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error?: any
  data?: any
}

export interface UseAsyncInterface {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  setData: (data: any) => void
  setError: (error: any) => void
  error: object
  status: string
  data: any[]
  run: (promise: Promise<any>) => any
  reset: () => void
}

const defaultInitialState = { status: "idle", data: null, error: null }

function useAsync(initialState?: UseAsyncProps): UseAsyncInterface {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const [{ status, data, error }, setState] = useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = useCallback(
    (response: any) => {
      return safeSetState({ data: response, status: "resolved" })
    },
    [safeSetState],
  )
  const setError = useCallback(
    (response: any) => safeSetState({ error: response, status: "rejected" }),
    [safeSetState],
  )
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState])

  const run = useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise.
          Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({ status: "pending" })
      return promise.then(
        (response: any) => {
          setData(response)
          return response
        },
        (err: any) => {
          setError(err)
          return Promise.reject(err)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export { useAsync }
