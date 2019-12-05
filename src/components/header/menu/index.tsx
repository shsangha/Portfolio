import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react"
import { TimelineLite } from "gsap"
import Loadable from "react-loadable"
import { Link } from "gatsby"

import { MenuState } from "../../../../types/index"
import "./menu.scss"

interface Props {
  location: Location
  menuStatus: MenuState
  setMenuStatus: Dispatch<SetStateAction<MenuState>>
}

let tl: GSAPStatic.Timeline = {} as GSAPStatic.Timeline

const Background = Loadable({
  loader: () => import("./Background"),
  loading: () => null,
})

const ImagePreview = () => (
  <>
    <img
      className="menu_img"
      src="https://images.unsplash.com/photo-1548280647-c6b4af562f4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    />{" "}
    <img
      className="menu_img "
      src="https://images.unsplash.com/photo-1551009175-15bdf9dcb580?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    />{" "}
    <img
      className="menu_img "
      src="https://images.unsplash.com/photo-1509472290917-08d8d47c5fca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    />
    <img
      className="menu_img "
      src="https://images.unsplash.com/photo-1563772770588-e53813b0eac6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    />{" "}
    <img
      className="menu_img "
      src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    />
  </>
)

export default ({ setMenuStatus, menuStatus, location }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const [hovered, setHovered] = useState("")

  useEffect(() => {
    tl = new TimelineLite({
      paused: true,
      onReverseComplete: () => {
        setMenuStatus({
          menuOpen: false,
          menuVisible: false,
        })
      },
    })
      .to(".menu", 1, { opacity: 1 })
      .to(".header_logo_g", 1, { fill: "white" }, "-=1")
      .to(
        ".menu_btn",
        1,
        {
          rotation: "45deg",
        },
        "-=1"
      )
  }, [])

  useEffect(() => {
    if (menuStatus.menuVisible) {
      tl.play()
    } else {
      tl.reverse()
    }
  }, [menuStatus.menuVisible])

  return (
    <div className="menu">
      <div className="menu_content">
        <Background />
        {["about", "skills", "work", "contact"].map(item => (
          <svg
            onMouseEnter={() => {
              setHovered(item)
            }}
            onMouseLeave={() => {
              setHovered("")
            }}
            className={`menu_link ${item} ${
              hovered && item !== hovered ? "not_hovered" : ""
            }`}
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id={`mask_${item}`} x="0" y="0" width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <text
                  fontSizeAdjust="0.58"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  x="50%"
                  y="50%"
                >
                  {item}
                </text>
              </mask>
            </defs>
            <rect
              mask={`url(#mask_${item})`}
              x="0"
              y="0"
              width="100%"
              height="100%"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}
