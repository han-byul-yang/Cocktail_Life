import { useEffect, useMemo, useRef, useState } from 'react'

const useTargetIntersect = () => {
  const intersectTarget = useRef(null)
  const [isInterSecting, setIsInterSecting] = useState(false)

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: '100px',
    }
  }, [])

  const callback = (entries: IntersectionObserverEntry[], observer: any) => {
    const [entry] = entries
    if (entry.intersectionRatio >= 1) {
      console.log(entry.target, 'isInViewPort')
      setIsInterSecting(true)
    }

    if (entry.isIntersecting) {
      console.log(entry.target, 'isInterSecting')
      setIsInterSecting(true)

      observer.unobserve(entry.target)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    intersectTarget.current && observer.observe(intersectTarget.current)

    return () => observer.disconnect()
  }, [options])

  return { intersectTarget, isInterSecting }
}

export default useTargetIntersect
