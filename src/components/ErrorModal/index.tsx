import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isOpenErrorModalAtom, errorMessageAtom } from 'store/atom'

import { ErrorIcon } from 'assets/svgs'
import styles from './errorModal.module.scss'

const ErrorModal = () => {
  const setOpenMessageModal = useSetRecoilState(isOpenErrorModalAtom)
  const errorMessage = useRecoilValue(errorMessageAtom)

  const handleErrorOkButtonClick = () => {
    setOpenMessageModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <div className={styles.typeBox}>
          <ErrorIcon className={styles.typeIcon} />
          <p>ERROR</p>
        </div>
        <p>{errorMessage}</p>
        <button type='button' onClick={handleErrorOkButtonClick}>
          확인
        </button>
      </div>
    </>
  )
}

export default ErrorModal
