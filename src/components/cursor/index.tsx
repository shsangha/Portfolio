/* eslint-disable complexity */
import React, { useEffect, useRef } from "react"
import "./style.scss"
import gsap from "gsap"

let overLink = false
let clientX = -30
let clientY = -30

export default (props: {
  children: (arg: {
    focusLink: () => {
      onMouseEnter: ()=>void,
      onMouseLeave: ()=>void
    }
    contrastCursor: () => Object
  }) => React.ReactNode
}) => {
  const cursorRef: React.RefObject<HTMLDivElement> = useRef(null)

  const handleMove = (e: MouseEvent) => {
    clientX = e.clientX
    clientY = e.clientY
  }

  const initCursor = () => {
    const innerCursor = cursorRef.current

    document.addEventListener("mousemove", handleMove)

    const render = () => {
      gsap.set(innerCursor, {
        x: clientX,
        y: clientY,
      })

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  useEffect(() => {
    initCursor()

    return () => {
      document.removeEventListener("mousemove", handleMove)
    }
  }, [])
  const contrastCursor = () => ({
    onMouseEnter: () => {
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          background: "red",
          opacity: 1,
          mixBlendMode: "exclusion",
        })
      }
    },
    onMouseLeave: () => {
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          background: "blue",
          opacity: 0.7,
          mixBlendMode: "normal",
        })
      }
    },
  })

  const focusLink = () => ({
    onMouseEnter: () => {
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          opacity: 0.6,
          background: "#41EAD4",
        })
      }
    },
    onMouseLeave: () => {
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          opacity: 0.7,
          background: "blue",
        })
      }
    },
  })

  return (
    <>
      {props.children &&
        props.children({
          focusLink,
          contrastCursor,
        })}
      <div ref={cursorRef} className={`cursor cursor_inner`} />
    </>
  )
}
