import { useCallback, useEffect, useRef, useState } from 'react'

const Result = () => {
  const ref = useRef(null)
  const [click, setClick] = useState(false)
  const [clock, setClock] = useState(false)

  const handleRefDOM = (eleDom: any) => {
    if (eleDom) console.log('mount')
    else console.log('unmount')
  }

  const handleClickBtn = () => {
    setClick((prev) => !prev)
  }

  const handleClickClock = () => {
    setClock((prev) => !prev)
  }

  /* useEffect(() => {
    if (ref !== null) console.log('mounted')
  }, [click])

  useEffect(() => {
    if (ref === null) console.log('unmount')
  }, [click])
*/
  return (
    <>
      <div ref={handleRefDOM}>hello</div>
      <button type='button' onClick={handleClickBtn}>
        search
      </button>
      <button type='button' onClick={handleClickClock}>
        clock
      </button>
    </>
  )
}

export default Result
