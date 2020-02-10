import React, { useEffect } from "react"

export default ({ location, status, setMenuType }) => {
  useEffect(() => {
    if (status === "entered") {
      const { pathname } = location

      const dark = pathname.match(/(^\/(contact|work)$)|^\/skills\/|^\/$/)
      const light = pathname.match(/(^\/(skills|about)$)|^\/work\//)

      if (dark) {
        setMenuType("dark")
      } else if (light) {
        setMenuType("light")
      }
    }
  }, [status])

  return null
}
