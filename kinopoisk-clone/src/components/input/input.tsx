import React from 'react'

type InputType = 'text' | 'email' | 'password' | 'checkbox' | 'number'

interface InputProps {
  type: InputType
  label?: string
  id?: string
  name?: string
  checked?: boolean
  className?: string
  value?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input(props: InputProps): React.ReactElement {
  const { type, label, id, name, className, checked, value, placeholder, onChange } = props

  return (
    <>
      {label && (
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        className={className}
        checked={checked}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  )
}