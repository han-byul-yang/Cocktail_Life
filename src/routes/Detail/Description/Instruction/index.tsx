import memoImg from 'assets/img/memo.png'
import styles from './instruction.module.scss'

interface IInstructionProps {
  strInstructions: string | null
}

const Instruction = ({ strInstructions }: IInstructionProps) => {
  return (
    <>
      <p className={styles.titleContainer}>
        <img alt='instructionImg' src={memoImg} />
        INSTRUCTION
      </p>
      <p className={styles.instruction}>{strInstructions}</p>
    </>
  )
}

export default Instruction
