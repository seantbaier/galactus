import { useState } from "react"
import { CreateDBInstanceCommandInput } from "@aws-sdk/client-rds"
import { Button, CancelButton } from "/@/components/Buttons"
import { useCreateDBInstance } from "/@/hooks/useRDS"
import { classNames } from "/@/utils/tailwind"
import RDSFormModal from "./RDSFormModal"
import { createDBInstanceCommandInput } from "../../rdsCommands"
import Combobox from "../Comboboxes/Combobox"

const dbInstanceClassOptions = [{ id: "db.t3.small", name: "db.t3.small", value: "db.t3.small" }]

const dbInstanceEngineOptions = [
  { id: "postgres", name: "postgres", value: "postgres" },
  { id: "mysql", name: "mysql", value: "mysql" },
]

const dbInstanceEngineVersionOptions = [
  { id: "postgres-13.4", name: "Postgres 13.4", value: "13.4" },
  { id: "mysql-8.0.28", name: "MySQL 8.0.28", value: "8.0.28" },
]

type FormGroupProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  description?: string
  name: string
  id: string
  type: "text" | "password" | "number"
  autoComplete: string
  placeholder?: string
  required?: boolean
  helperText?: string
  value?: string | number
}

function FormGroup({
  onChange,
  id,
  name,
  type,
  label,
  description = "",
  autoComplete,
  placeholder = "",
  required = false,
  helperText = "",
  value,
}: FormGroupProps) {
  return (
    <label htmlFor="tableName" className="block text-white-main text-left text-sm">
      <div className="flex flex-col">
        <span className="mb-1">{label}</span>
        {description ? (
          <span className="block max-w-[70%] text-xs mb-2 opacity-[.5]">{description}</span>
        ) : null}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={classNames(
          "mt-1 mb-1 block w-full placeholder:italic",
          "placeholder:text-white-main placeholder:text-sm placeholder:opacity-[.4]",
          "bg-black-main appearance-none rounded-md border border-white-main border-opacity-[.5] px-3 py-2 shadow-sm",
          "focus:ring-1 focus:border-primary-light focus:outline-none focus:ring-primary-light",
        )}
        onChange={onChange}
      />
      <span className="text-xs opacity-[.5] italic">{helperText}</span>
    </label>
  )
}

type RDSDBInstanceFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

function RDSDBInstanceForm({ open, setOpen }: RDSDBInstanceFormProps) {
  const [formData, setFormData] = useState<CreateDBInstanceCommandInput>({
    AllocatedStorage: 10,
    DBInstanceClass: "db.t3.small",
    DBName: "",
    DBInstanceIdentifier: "",
    Engine: "postgres",
    EngineVersion: "13.4",
    MasterUserPassword: "",
    MasterUsername: "",
  })

  const createTableMutation = useCreateDBInstance()

  const createTable = async () => {
    createTableMutation.mutate(createDBInstanceCommandInput)
  }

  const onSubmit = () => {
    createTable().then(() => {
      setOpen(!open)
    })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e || {}
    setFormData({ ...formData, [target.name]: target.value })
  }

  return (
    <RDSFormModal open={open} setOpen={setOpen}>
      <div className="flex min-h-full flex-col justify-center">
        <div className="mb-4">
          <h2 className="text-lg text-white-main font-semibold text-left mb-2">Create Database</h2>
          <p className="text-white-main text-xs text-left">
            Amazon Relational Database Service (RDS) makes it easy to set up, operate, and scale a
            relational database in the cloud.
          </p>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="mt-1">
              <Combobox items={dbInstanceEngineOptions} label="Engine" onChange={handleOnChange} />
            </div>
            <div className="mt-4">
              <Combobox
                items={dbInstanceEngineVersionOptions}
                label="Engine Version"
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4">
              <Combobox
                items={dbInstanceClassOptions}
                label="Database Instance Class"
                description="The DB instance configuration options below are limited to those supported by the engine that you selected above."
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Database Name"
                id="DBName"
                name="DBName"
                type="text"
                value={formData.DBName}
                description="This wil be used to identify your database."
                placeholder="Enter a database name"
                autoComplete="DBName"
                required
                onChange={handleOnChange}
                helperText="Placeholder helper text"
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Database Instance Identifier"
                id="DBInstanceIdentifier"
                name="DBInstanceIdentifier"
                type="text"
                value={formData.DBInstanceIdentifier}
                description="This wil be used to identify your instance."
                placeholder="Enter an instance identifer"
                autoComplete="DBInstanceIdentifier"
                required
                onChange={handleOnChange}
                helperText="Placeholder helper text"
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Allocated Storage"
                id="AllocatedStorage"
                name="AllocatedStorage"
                type="number"
                value={formData.AllocatedStorage}
                autoComplete="AllocatedStorage"
                description="This is a fake description I need to fill in later."
                placeholder="Enter allocated storage"
                required
                helperText="Fake helper text will update later."
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Master Username"
                id="MasterUsername"
                name="MasterUsername"
                type="text"
                value={formData.MasterUsername}
                autoComplete="MasterUsername"
                description="This is a fake description I need to fill in later."
                placeholder="Enter username"
                required
                helperText="Fake helper text will update later."
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Master Password"
                id="MasterUserPassword"
                name="MasterUserPassword"
                type="password"
                value={formData.MasterUserPassword}
                autoComplete="MasterUserPassword"
                description="This is a fake description I need to fill in later."
                placeholder="Enter password"
                required
                helperText="Fake helper text will update later."
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <CancelButton
              text="Cancel"
              type="button"
              onClick={() => setOpen(false)}
              className="mr-4"
            />
            <Button text="Create table" type="submit" />
          </div>
        </form>
      </div>
    </RDSFormModal>
  )
}

export default RDSDBInstanceForm
