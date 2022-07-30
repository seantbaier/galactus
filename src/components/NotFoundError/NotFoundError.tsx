import { useNavigate } from "react-router-dom"

function NotFoundError(): JSX.Element {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate("/")
  }

  return (
    <div>
      <div>404 Not Found</div>
      <button type="button" onClick={handleOnClick}>
        Home
      </button>
    </div>
  )
}

export default NotFoundError
