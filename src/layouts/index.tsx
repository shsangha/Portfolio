import React, { useState, Dispatch, SetStateAction, createContext } from "react"
import PropTypes from "prop-types"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import gsap from "gsap"
import Header from "../components/header"
import { ReachRouterLocation, MenuState } from "../../types/index"
import Cursor from "../components/cursor"
import Footer from "./footer"

import "./layout.scss"

let a: GSAPTimeline | null
let b: GSAPTimeline | null
export const CursorContext = createContext({
  focusLink: () => {},
  contrastCursor: () => {},
})

const timeout = 1100 // can make this a passsble state variable

const Layout = ({
  children,
  location,
}: {
  children: React.ReactElement
  location: ReachRouterLocation
}) => {
  const [menuStatus, setMenuStatus]: [
    MenuState,
    Dispatch<SetStateAction<MenuState>>
  ] = useState<MenuState>({
    menuVisible: false,
    menuOpen: false,
  })

  return (
    <Cursor>
      {({ focusLink, contrastCursor }) => {
        return (
          <div className="container_wrapper">
            <Header
              setMenuStatus={setMenuStatus}
              menuStatus={menuStatus}
              location={location}
            />

            <TransitionGroup>
              <ReactTransition
                key={location.pathname}
                appear={false}
                onEntering={node => {
                  if (b && b.progress() < 1) {
                    b.progress(0)
                    b.clear()
                  }

                  b = gsap
                    .timeline({
                      onComplete: () => {
                        setMenuStatus({
                          menuOpen: false,
                          menuVisible: false,
                        })
                      },
                    })
                    .set(node, { zIndex: 4 })
                    .add(() => {
                      setMenuStatus(prev => ({ ...prev, menuVisible: false }))
                    })
                    .fromTo(
                      node,
                      1,
                      {
                        y: "100vh",
                      },
                      {
                        y: "0vh",
                        ease: "power3.in",
                      }
                    )
                    .set(node, { zIndex: 0, background: "white" })
                    .set(node.firstChild, { opacity: 1, y: 0 })
                }}
                onExiting={node => {
                  if (a && a.progress() < 1) {
                    a.progress(0)
                    a.clear()
                  }

                  a = gsap
                    .timeline()
                    .set(node, { zIndex: -1 })
                    .fromTo(
                      [".menu_wrapper", node.firstChild!],
                      1,
                      { y: 0 },
                      {
                        y: "-50vh",
                        ease: "power1",
                      }
                    )
                    .to(
                      [node.firstChild, ".three_container"],
                      0.6,
                      { opacity: 0, ease: "power2" },
                      "-=1"
                    )
                    .to(node, 0.4, { background: "rgba(0,0,0,0.9)" }, "-=1")
                }}
                timeout={{
                  enter: timeout,
                  exit: timeout,
                }}
              >
                <CursorContext.Provider value={{ focusLink, contrastCursor }}>
                  <div
                    className={`container ${
                      menuStatus.menuOpen ? "disable_scroll" : ""
                    } animation_controller_slideup ${location.pathname}`}
                  >
                    {children}
                    {location.pathname !== "/contact" && <Footer />}
                  </div>
                </CursorContext.Provider>
              </ReactTransition>
            </TransitionGroup>
          </div>
        )
      }}
    </Cursor>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
