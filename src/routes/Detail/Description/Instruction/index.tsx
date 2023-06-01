import memoImg60 from 'assets/img/memo@60w.webp'
import memoImg45 from 'assets/img/memo@45w.webp'
import memoImg30 from 'assets/img/memo@30w.webp'
import styles from './instruction.module.scss'

interface IInstructionProps {
  strInstructions: string | null
}

const Instruction = ({ strInstructions }: IInstructionProps) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <img
          alt='instructionImg'
          src={memoImg60}
          srcSet={`${memoImg60} 2000w, ${memoImg45} 1024w, ${memoImg30} 768w`}
        />
        INSTRUCTION
      </div>
      <p className={styles.instruction}>{strInstructions}</p>
    </>
  )
}

export default Instruction
