import React, { Component } from "react"
import gsap from "gsap"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "./menu.scss"
import { MenuProps } from "../../../types"

export default class Menu extends Component<MenuProps> {
  state = {
    hovered: "",
    transitioning: "",
  }

  menuToggleTL: GSAPTimeline | null = null
  navigationChangeTL: GSAPTimeline | null = null

  public componentDidMount(): void {
    this.menuToggleTL = gsap
      .timeline()
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

  public componentDidUpdate(prevProps: MenuProps): void {
    const {
      menuStatus: { menuVisible },
      setMenuStatus,
      location,
    } = this.props

    const { menuToggleTL, navigationChangeTL } = this

    if (prevProps.menuStatus.menuVisible !== menuVisible && !menuVisible) {
      menuToggleTL && menuToggleTL.reverse()
    }

    if (location.pathname !== prevProps.location.pathname && location.state) {
      if (navigationChangeTL && navigationChangeTL.progress() < 1) {
        navigationChangeTL.progress(100)
        navigationChangeTL.clear()
      }

      this.navigationChangeTL = gsap
        .timeline()
        .add(() => {
          if (location.state && location.state.target) {
            this.setState({
              transitioning: location.state.target,
            })
          }
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
    const { menuType, imageData } = this.props

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
                  onMouseLeave={(): void => {
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
                  <Img
                    className="imginner"
                    fluid={imageData.about1.childImageSharp.fluid}
                  />
                </div>
                <div className="menu_img_about two menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.about2.childImageSharp.fluid}
                  />
                </div>
                <div className="menu_img_about three menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.about3.childImageSharp.fluid}
                  />
                </div>
              </>
            )}
            {(hovered === "skills" || transitioning === "skills") && (
              <>
                <div className="menu_img_skills one menu_img ">
                  <Img
                    className="imginner"
                    fluid={imageData.skills1.childImageSharp.fluid}
                  />{" "}
                </div>
                <div className="menu_img_skills two menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.skills2.childImageSharp.fluid}
                  />{" "}
                </div>
                <div className="menu_img_skills three menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.skills3.childImageSharp.fluid}
                  />
                </div>
              </>
            )}
            {(hovered === "work" || transitioning === "work") && (
              <>
                <div className="menu_img_work one menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.project1.heroimage.fluid}
                  />{" "}
                </div>
                <div className="menu_img_work two menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.project2.heroimage.fluid}
                  />{" "}
                </div>
                <div className="menu_img_work three menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.project3.heroimage.fluid}
                  />{" "}
                </div>
              </>
            )}
            {(hovered === "contact" || hovered === "contact") && (
              <>
                <div className="menu_img_contact one menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.contact1.childImageSharp.fluid}
                  />
                </div>
                <div className="menu_img_contact two menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.contact2.childImageSharp.fluid}
                  />
                </div>
                <div className="menu_img_contact three menu_img">
                  <Img
                    className="imginner"
                    fluid={imageData.contact3.childImageSharp.fluid}
                  />
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
