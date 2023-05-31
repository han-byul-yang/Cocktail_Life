import { useEffect, useRef, useState } from 'react'

const useTargetIntersect = (options: IntersectionObserverInit) => {
  const intersectTarget = useRef(null)
  const [isInViewPort, setIsInViewPort] = useState(false)
  const [isInterSecting, setIsInterSecting] = useState(false)

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.intersectionRatio >= 1) {
      setIsInViewPort(true)
      return
    }

    if (entry.isIntersecting) {
      setIsInterSecting(true)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    intersectTarget.current && observer.observe(intersectTarget.current)

    return () => observer.disconnect()
  }, [options])

  return { intersectTarget, isInViewPort, isInterSecting }
}

export default useTargetIntersect
