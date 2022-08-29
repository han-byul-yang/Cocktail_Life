import { MouseEventHandler, ReactNode } from 'react'

import styles from './button.module.scss'

interface IButtonProps {
  children: ReactNode
  handleClick: MouseEventHandler<HTMLButtonElement>
  size: string
}

const Button = ({ children, handleClick, size }: IButtonProps) => {
  return (
    <button className={styles[`${size}Button`]} type='button' onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button
