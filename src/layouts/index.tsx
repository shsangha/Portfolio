import React, { useState, Dispatch, SetStateAction, createContext } from "react"
import PropTypes from "prop-types"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import gsap from "gsap"
import Header from "../components/header"
import { ReachRouterLocation, MenuState } from "../types/index"
import Cursor from "../components/cursor"
import MenuColorHelper from "./menuColorHelper"
import { CursorContextInterface, ImageDataInterface } from "../types/index"
import { StaticQuery, graphql } from "gatsby"
import "./layout.scss"

let activeEnterTimeline: GSAPTimeline | null = null
let activeExitTimeline: GSAPTimeline | null = null

export const CursorContext = createContext({} as CursorContextInterface)

const Layout = ({
  children,
  location,
}: {
  children: React.ReactElement
  location: ReachRouterLocation
}): React.ReactNode => {
  const [menuStatus, setMenuStatus]: [
    MenuState,
    Dispatch<SetStateAction<MenuState>>
  ] = useState<MenuState>({
    menuVisible: false,
    menuOpen: false,
  })

  return (
    <StaticQuery
      query={graphql`
        query {
          about1: file(relativePath: { eq: "menuAbout1.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          about2: file(relativePath: { eq: "menuAbout2.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          about3: file(relativePath: { eq: "menuAbout3.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          skills1: file(relativePath: { eq: "menuSkills1.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          skills2: file(relativePath: { eq: "menuSkills2.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          skills3: file(relativePath: { eq: "menuSkills3.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          contact1: file(relativePath: { eq: "menuContact1.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          contact2: file(relativePath: { eq: "menuContact2.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          contact3: file(relativePath: { eq: "menuContact3.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          project1: contentfulProject(title: { eq: "BSTS" }) {
            heroimage {
              fluid(maxWidth: 700) {
                ...GatsbyContentfulFluid
              }
            }
          }
          project2: contentfulProject(title: { eq: "Unidentified" }) {
            heroimage {
              fluid(maxWidth: 700) {
                ...GatsbyContentfulFluid
              }
            }
          }
          project3: contentfulProject(
            title: { eq: "Alberta Commercial Group" }
          ) {
            heroimage {
              fluid(maxWidth: 700) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      `}
    >
      {(data: ImageDataInterface): React.ReactNode => (
        <Cursor>
          {({ focusLink, contrastCursor }): React.ReactNode => {
            return (
              <div className="container_wrapper">
                <Header
                  setMenuStatus={setMenuStatus}
                  menuStatus={menuStatus}
                  location={location}
                  focusLink={focusLink}
                  imageData={data}
                >
                  {({ setMenuType }): React.ReactElement => {
                    return (
                      <CursorContext.Provider
                        value={{
                          focusLink,
                          contrastCursor,
                          setMenuType,
                          menuStatus,
                        }}
                      >
                        <TransitionGroup>
                          <ReactTransition
                            key={location.pathname}
                            appear={false}
                            onEntering={(node: HTMLElement): void => {
                              if (
                                activeEnterTimeline &&
                                activeEnterTimeline.progress() < 1
                              ) {
                                activeEnterTimeline.progress(0)
                                activeEnterTimeline.clear()
                              }

                              activeEnterTimeline = gsap
                                .timeline()
                                .set(node, { zIndex: 3, y: "100%" })
                                .to(node, 0.9, {
                                  y: "-=100%",
                                  ease: "power4.in",
                                })
                                .set(node, { zIndex: 1 }, "+=0.2")
                            }}
                            onExiting={(node: HTMLElement): void => {
                              if (
                                activeExitTimeline &&
                                activeExitTimeline.progress() < 1
                              ) {
                                activeExitTimeline.progress(0)
                                activeExitTimeline.clear()
                              }

                              activeExitTimeline = gsap
                                .timeline()
                                .addLabel("start")
                                .set(node, { zIndex: -1 })
                                .set(".transition_cover", { zIndex: 1, y: 0 })
                                .to(
                                  ".transition_cover",
                                  1,
                                  { opacity: 0.7 },
                                  "start"
                                )
                                .to(node, 1, { y: "0vh" }, "start")
                                .set(".transition_cover", {
                                  opacity: 0,
                                  zIndex: -1,
                                  y: 0,
                                })
                            }}
                            timeout={menuStatus.menuOpen ? 1000 : 1000}
                          >
                            {(status): React.ReactNode => (
                              <>
                                <MenuColorHelper
                                  status={status}
                                  location={location}
                                  setMenuType={setMenuType}
                                />
                                <div
                                  className={`container ${
                                    menuStatus.menuOpen ? "disable_scroll" : ""
                                  } animation_controller_slideup ${
                                    location.pathname
                                  }`}
                                >
                                  {children}
                                </div>
                              </>
                            )}
                          </ReactTransition>
                        </TransitionGroup>
                      </CursorContext.Provider>
                    )
                  }}
                </Header>
                <div className="transition_cover" />
              </div>
            )
          }}
        </Cursor>
      )}
    </StaticQuery>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
