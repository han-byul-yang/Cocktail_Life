import styles from './instruction.module.scss'

interface IInstructionProps {
  strInstructions: string | null
}

const Instruction = ({ strInstructions }: IInstructionProps) => {
  return (
    <>
      <p className={styles.title}>~~INSTRUCTION~~</p>
      <p className={styles.instruction}>{strInstructions}</p>
    </>
  )
}

export default Instruction
