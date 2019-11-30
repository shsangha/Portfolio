import React, { useState, Dispatch, SetStateAction } from "react"
import PropTypes from "prop-types"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import Header from "../components/header"
import { ReachRouterLocation, MenuState } from "../../types/index"

import "./layout.scss"

const timeout = 500

const Layout = ({
  children,
  location,
}: {
  children: React.ReactChild
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
    <div>
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
            {children}
          </div>
        </ReactTransition>
      </TransitionGroup>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
