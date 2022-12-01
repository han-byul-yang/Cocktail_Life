import memoImg from 'assets/img/memo.webp'
import styles from './instruction.module.scss'

interface IInstructionProps {
  strInstructions: string | null
}

const Instruction = ({ strInstructions }: IInstructionProps) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <img loading='lazy' alt='instructionImg' src={memoImg} />
        INSTRUCTION
      </div>
      <p className={styles.instruction}>{strInstructions}</p>
    </>
  )
}

export default Instruction
