import { MouseEventHandler, ReactNode } from 'react'

import styles from './button.module.scss'

interface IButtonProps {
  children: ReactNode
  handleClick: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ children, handleClick }: IButtonProps) => {
  return (
    <button className={styles.button} type='button' onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button
