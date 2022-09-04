import { TrashIcon } from "@radix-ui/react-icons"

type DeleteButtonProps = {
  onDelete: (info: any) => void
  info: any
}

function DeleteButton({ info, onDelete }: DeleteButtonProps) {
  return (
    <button className="flex justify-end" onClick={() => onDelete(info)} type="button">
      <TrashIcon className="text-red-900" />
    </button>
  )
}

export default DeleteButton
