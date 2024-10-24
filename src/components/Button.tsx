import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ onClick, title, disabled, className }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>{title}</button>
  )
}
