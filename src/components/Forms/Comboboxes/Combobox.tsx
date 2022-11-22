import { useState } from "react"
import { ChevronDownIcon } from "/@/components/Icons"
import { Combobox as HeadlessCombobox } from "@headlessui/react"
import { classNames } from "/@/utils/tailwind"

type ComboboxDropdownProps = {
  items: ComboboxItem[]
}

function SelectedOption({ text }: { text: string }) {
  return (
    <span className={classNames("block truncate", "font-semibold text-primary-light")}>
      {text}
    </span>
  )
}

function ActiveOption({ text }: { text: string }) {
  return <span className={classNames("block truncate", "text-white-main")}>{text}</span>
}

function ComboboxDropdown({ items }: ComboboxDropdownProps) {
  const renderSelectOption = (active: boolean, selected: boolean, item: ComboboxItem) => {
    if (active) {
      return <ActiveOption text={item.name} />
    }

    if (selected) {
      return <SelectedOption text={item.name} />
    }

    return <span className="text-white-main text-opacity-[.5]">{item.name}</span>
  }
  return (
    <div>
      {items.length > 0 && (
        <HeadlessCombobox.Options
          className={classNames(
            "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md",
            "bg-black-main py-1 text-base shadow-lg ring-none focus:outline-none sm:text-sm",
          )}
        >
          {items.map(item => (
            <HeadlessCombobox.Option
              key={item.id}
              value={item}
              className={({ active, selected }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-primary-light text-white-main" : "text-white-light",
                  selected ? "bg-primary-dark" : "",
                )
              }
            >
              {({ active, selected }) => renderSelectOption(active, selected, item)}
            </HeadlessCombobox.Option>
          ))}
        </HeadlessCombobox.Options>
      )}
    </div>
  )
}

type ComboboxItem = {
  id: number
  name: string
}

type ComboboxProps = {
  items: ComboboxItem[]
  displayValue?: (item: any) => string
}

function Combobox({ items = [], displayValue }: ComboboxProps) {
  const [query, setQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState()

  const defaultDisplayValue = (item: ComboboxItem) => item?.name

  const filteredItems =
    query === ""
      ? items
      : items.filter(item => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <HeadlessCombobox as="div" value={selectedItem} onChange={setSelectedItem}>
      <HeadlessCombobox.Label className="block text-sm font-medium text-white-main">
        Tables
      </HeadlessCombobox.Label>
      <div className="relative mt-1">
        <HeadlessCombobox.Input
          className="text-white-main w-full rounded-md border border-white-main bg-black-dark py-2 pl-3 pr-10 shadow-sm focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light sm:text-sm"
          onChange={event => setQuery(event.target.value)}
          displayValue={displayValue || defaultDisplayValue}
        />
        <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronDownIcon className="h-5 w-5 text-white-main" aria-hidden="true" />
        </HeadlessCombobox.Button>

        <ComboboxDropdown items={filteredItems} />
      </div>
    </HeadlessCombobox>
  )
}

export default Combobox
