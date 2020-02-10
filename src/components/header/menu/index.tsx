import React, { Component, Dispatch, SetStateAction } from "react"
import gsap from "gsap"
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

interface StatefulLocation extends Location {
  state: {
    animation: string
    target: string
  }
}

interface Props {
  location: StatefulLocation
  menuStatus: MenuState
  setMenuStatus: Dispatch<SetStateAction<MenuState>>
  menuType: string
}

export default class Menu extends Component<Props> {
  state = {
    hovered: "",
    transitioning: "",
  }

  menuToggleTL: GSAPTimeline | null = null
  navigationChangeTL: GSAPTimeline | null = null

  public componentDidMount(): void {
    const { setMenuStatus } = this.props

    this.menuToggleTL = gsap
      .timeline({
        onReverseComplete: () => {
          setMenuStatus({
            //     menuOpen: false,
            //      menuVisible: false,
          })
        },
      })
      .to(".menu", 0.8, { y: 0, ease: "power2.in" })
      .to(".menu", 1, { opacity: 1, ease: "power2" }, "-=0.8")
      .fromTo(".menu_btn", 0.5, { rotation: 0 }, { rotation: "45deg" }, "-=0.5")
      .staggerTo(
        ".menu_link_svg",
        0.2,
        {
          opacity: 1,
          ease: "power1",
        },
        0.2,
        "-=0.3"
      )
  }

  public componentDidUpdate(prevProps: Props): void {
    const {
      menuStatus: { menuVisible },
      setMenuStatus,
      location,
    } = this.props

    const { menuToggleTL, navigationChangeTL } = this

    if (prevProps.menuStatus.menuVisible !== menuVisible && !menuVisible) {
      menuToggleTL && menuToggleTL.reverse()
    }

    if (
      location.pathname !== prevProps.location.pathname &&
      location.state &&
      location.state.target
    ) {
      if (navigationChangeTL && navigationChangeTL.progress() < 1) {
        navigationChangeTL.progress(100) // play around with this
        navigationChangeTL.clear()
      }

      this.navigationChangeTL = gsap
        .timeline()
        .add(() => {
          this.setState({
            transitioning: location.state.target,
          })
        })
        .set([".menu_link_svg", ".menu_btn"], { pointerEvents: "none" })
        .set(".menu_cover", { zIndex: 2 })
        .set(".menu", { zIndex: 1 })
        .addLabel("start")
        .fromTo(
          ".menu_btn",
          1,
          {
            rotation: "45deg",
          },
          {
            pointerEvents: "all",
            rotation: "0",
            ease: "power2.in",
          },
          "start"
        )
        .add(() => {
          setMenuStatus({
            menuOpen: false,
            menuVisible: false,
          })
        })
    }
  }

  public setHovered = (hovered: string): void => {
    this.setState({
      hovered,
    })
  }
  public render(): JSX.Element {
    const { hovered, transitioning } = this.state
    const { menuType } = this.props
    const { setHovered } = this

    return (
      <div className="menu">
        <div className={`menu_wrapper ${menuType}`}>
          <div className="menu_content animation_controller_slideup">
            {["about", "skills", "work", "contact"].map(item => (
              <Link
                key={item}
                to={`/${item}`}
                state={{ animation: "menu_animation", target: `${item}` || "" }}
                className={`menu_link ${item} ${menuType} ${
                  (hovered && item !== hovered) ||
                  (transitioning && transitioning && item !== transitioning)
                    ? "not_hovered"
                    : ""
                }`}
              >
                <svg
                  overflow="visible"
                  width="100%"
                  height="100%"
                  className="menu_link_svg"
                  onMouseEnter={() => {
                    setHovered(item)
                  }}
                  onMouseLeave={() => {
                    setHovered("")
                  }}
                  viewBox="0 0 400 120"
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
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="white"
                        shapeRendering="crispEdges"
                      />
                      <text
                        fontSizeAdjust="0.4"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        dominantBaseline="middle"
                        lengthAdjust="spacingAndGlyphs"
                        x="50%"
                        y="50%"
                        shapeRendering="crispEdges"
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
                    shapeRendering="crispEdges"
                    strokeWidth="10px"
                    fill={menuType === "light" ? "#d4d6d8" : "#0c0c0c"}
                  />
                </svg>
              </Link>
            ))}

            {(hovered === "about" || transitioning === "about") && (
              <>
                <div className="menu_img_about one menu_img">
                  <img className="imginner" src={about1} />
                </div>
                <div className="menu_img_about two menu_img">
                  <img className="imginner" src={about2} />
                </div>
                <div className="menu_img_about three menu_img">
                  <img className="imginner" src={about3} />
                </div>
              </>
            )}
            {(hovered === "skills" || transitioning === "skills") && (
              <>
                <div className="menu_img_skills one menu_img ">
                  <img className="imginner" src={skills1} />
                </div>
                <div className="menu_img_skills two menu_img">
                  <img className="imginner" src={skills2} />
                </div>
                <div className="menu_img_skills three menu_img">
                  <img className="imginner" src={skills3} />
                </div>
              </>
            )}
            {(hovered === "work" || transitioning === "work") && (
              <>
                <div className="menu_img_work one menu_img">
                  <img className="imginner" src={work} />
                </div>
                <div className="menu_img_work two menu_img">
                  <img className="imginner" src={work} />
                </div>
                <div className="menu_img_work three menu_img">
                  <img className="imginner" src={work} />
                </div>
              </>
            )}
            {(hovered === "contact" || hovered === "contact") && (
              <>
                <div className="menu_img_contact one menu_img">
                  <img className="imginner" src={contact1} />
                </div>
                <div className="menu_img_contact two menu_img">
                  <img className="imginner" src={contact2} />
                </div>
                <div className="menu_img_contact three menu_img">
                  <img className="imginner" src={contact3} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="menu_cover" />
      </div>
    )
  }
}
