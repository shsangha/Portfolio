import React, { useEffect } from "react"

export default (Component: React.ElementType) => (props: any) => {
  useEffect(() => {
    let options = {
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

    return () => {
      observer.disconnect()
    }
  }, [])

  return <Component {...props} />
}
