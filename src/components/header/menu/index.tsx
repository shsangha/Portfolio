import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react"
import gsap from "gsap"
import Loadable from "react-loadable"
import { Link } from "gatsby"

import { MenuState } from "../../../../types/index"
import "./menu.scss"

import about1 from "../../../../static/img/menuAbout1.jpg"
import about2 from "../../../../static/img/menuAbout2.jpg"
import about3 from "../../../../static/img/menuAbout3.jpg"

import skills1 from "../../../../static/img/menuSkills1.jpg"
import skills2 from "../../../../static/img/menuSkills2.jpg"
import skills3 from "../../../../static/img/menuSkills3.jpg"

import work from "../../../../static/img/project1lg.jpg"

import contact1 from "../../../../static/img/menuContact1.jpg"
import contact2 from "../../../../static/img/menuContact2.jpg"
import contact3 from "../../../../static/img/menuContact3.jpg"

interface Props {
  location: Location
  menuStatus: MenuState
  setMenuStatus: Dispatch<SetStateAction<MenuState>>
}

let tl: any

const Background = Loadable({
  loader: () => import("./Background"),
  loading: () => null,
})

export default ({ setMenuStatus, menuStatus, location }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const [hovered, setHovered] = useState("")

  useEffect(() => {
    tl = gsap
      .timeline({
        paused: true,
        onReverseComplete: () => {
          setMenuStatus({
            menuOpen: false,
            menuVisible: false,
          })
        },
      })
      .to(".menu", 0.8, { y: 0, ease: "power2.in" })
      .to(".menu", 1, { opacity: 1, ease: "power2" }, "-=0.8")
      .to(".menu_btn", 0.5, { rotation: "45deg" }, "-=0.5")
      .staggerTo(
        ".menu_link_svg",
        0.3,
        {
          background: "rgba(0,0,0, 0)",
          ease: "power1",
        },
        0.2,
        "-=0.2"
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
      <div className="menu_wrapper">
        <div className="menu_content animation_controller_slideup">
          <Background />
          {["about", "skills", "work", "contact"].map(item => (
            <Link
              key={item}
              to={`/${item}`}
              state={{ animation: "slide-up" }}
              className={`menu_link ${item} ${
                hovered && item !== hovered ? "not_hovered" : ""
              }`}
            >
              <svg
                className="menu_link_svg"
                onMouseEnter={() => {
                  setHovered(item)
                }}
                onMouseLeave={() => {
                  setHovered("")
                }}
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <mask
                    id={`mask_${item}`}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                  >
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
            </Link>
          ))}

          {hovered === "about" && (
            <>
              <div className="menu_img_about1 menu_img">
                <img className="imginner" src={about1} />
              </div>
              <div className="menu_img_about2 menu_img">
                <img className="imginner" src={about2} />
              </div>
              <div className="menu_img_about3 menu_img">
                <img className="imginner" src={about3} />
              </div>
            </>
          )}
          {hovered === "skills" && (
            <>
              <div className="menu_img_skills1 menu_img">
                <img className="imginner" src={skills1} />
              </div>
              <div className="menu_img_skills2 menu_img">
                <img className="imginner" src={skills2} />
              </div>
              <div className="menu_img_skills3 menu_img">
                <img className="imginner" src={skills3} />
              </div>
            </>
          )}
          {hovered === "work" && (
            <>
              <div className="menu_img_work1 menu_img">
                <img className="imginner" src={work} />
              </div>
              <div className="menu_img_work2 menu_img">
                <img className="imginner" src={work} />
              </div>
              <div className="menu_img_work3 menu_img">
                <img className="imginner" src={work} />
              </div>
            </>
          )}
          {hovered === "contact" && (
            <>
              <div className="menu_img_contact1 menu_img">
                <img className="imginner" src={contact1} />
              </div>
              <div className="menu_img_contact2 menu_img">
                <img className="imginner" src={contact2} />
              </div>
              <div className="menu_img_contact3 menu_img">
                <img className="imginner" src={contact3} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
