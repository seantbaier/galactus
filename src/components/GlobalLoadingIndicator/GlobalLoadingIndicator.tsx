import { useIsFetching } from "@tanstack/react-query"

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <div className="flex justify-center items-center">
      <svg className="animate-spin h-3 w-3 mr-3 ..." fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25 stroke-white-main" cx="12" cy="12" r="10" strokeWidth="4" />
        <path
          className="opacity-75 fill-white-main"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  ) : null
}

export default GlobalLoadingIndicator
