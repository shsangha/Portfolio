import React, { useState, Dispatch, SetStateAction, cloneElement } from "react"
import PropTypes from "prop-types"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import Header from "../components/header"
import { ReachRouterLocation, MenuState } from "../../types/index"
import Cursor from "../components/cursor"

import "./layout.scss"

const timeout = 500

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

  console.log(menuStatus)

  return (
    <Cursor>
      {({ focusLink, contrastCursor }) => (
        <div className="container_wrapper">
          <Header
            setMenuStatus={setMenuStatus}
            menuStatus={menuStatus}
            location={location}
          />
          <TransitionGroup>
            <ReactTransition
              key={location.pathname}
              timeout={{
                enter: timeout,
                exit: timeout,
              }}
            >
              <div
                className={`container ${
                  menuStatus.menuOpen ? "disable_scroll" : ""
                }`}
              >
                {cloneElement(children, {
                  focusLink,
                  location,
                  contrastCursor,
                })}
              </div>
            </ReactTransition>
          </TransitionGroup>
        </div>
      )}
    </Cursor>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
