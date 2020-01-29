import React, { useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (Component: React.ReactNode) => (
  props: any
): React.ReactNode => {
  useEffect(() => {
    const options = {
      threshold: 0.6,
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("intersected")
          observer.unobserve(entry.target)
        }
      })
    }, options)

    document.querySelectorAll(".observe").forEach(item => {
      observer.observe(item)
    })

    return (): void => {
      observer.disconnect()
    }
  }, [])

  return <Component {...props} />
}
