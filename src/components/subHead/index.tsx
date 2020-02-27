import React from "react"
import "./style.scss"

const SubHead = ({
  children,
  mode,
}: {
  mode: string
  children: string | null | Element
}): React.ReactNode => {
  return (
    <div className="subHead">
      <svg
        className="subHead_logo"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 90"
      >
        <g
          className={`subHead_logo_g ${mode === "dark" ? "dark" : ""}`}
          fill="black"
        >
          <polygon
            points="12.46 0.25 49.55 0.25 38.85 15.84 13.38 15.84 23.71 45.49 13.38 59.29 0.27 17.12 12.46 0.25"
            strokeMiterlimit="10"
            strokeWidth="0.49"
          />
          <polygon
            points="24.43 45.77 34.22 31.46 50.27 71.59 37.35 90.25 2.1 90.25 13.36 74.14 35.69 74.66 24.43 45.77"
            strokeMiterlimit="10"
            strokeWidth="0.49"
          />
        </g>
      </svg>
      <div className={`subHead_text ${mode === "dark" ? "dark" : ""}`}>
        <>{children}</>
      </div>
    </div>
  )
}

SubHead.defaultProps = {
  mode: "light",
}

export default SubHead
