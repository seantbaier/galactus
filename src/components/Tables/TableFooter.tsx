import { flexRender } from "@tanstack/react-table"

type TableFooterProps = {
  footerGroup: any
}

function TableFooterRow({ footerGroup }: TableFooterProps): JSX.Element {
  return (
    <tr key={footerGroup.id} className="rounded-bl-lg">
      {footerGroup.headers.map((header: any) => (
        <th key={header.id} className="opacity-0 first:rounded-bl-lg last:rounded-br-lg">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.footer, header.getContext())}
        </th>
      ))}
    </tr>
  )
}

export default TableFooterRow
