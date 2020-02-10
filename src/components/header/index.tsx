import React, {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react"
import "./header.scss"
import Menu from "./menu"
import { Transition, TransitionGroup } from "react-transition-group"
import { MenuState } from "../../../types/index"
import { Link } from "gatsby"

interface Props {
  location: Location
  menuStatus: MenuState
  setMenuStatus: Dispatch<SetStateAction<MenuState>>
  children: ({
    setMenuType,
  }: {
    setMenuType: Dispatch<SetStateAction<string>>
  }) => React.ReactElement
  focusLink: () => {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

export default ({
  location,
  menuStatus,
  setMenuStatus,
  focusLink,
  children,
}: Props): React.ReactElement => {
  const path = location.pathname
    .split("/")
    .filter((path, index) => index !== 0 && path !== "")

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [menuType, setMenuType] = useState("dark")

  const toggleMenu = (): void => {
    setMenuStatus(prevStatus => {
      if (prevStatus.menuOpen) {
        return {
          menuVisible: false,
          menuOpen: prevStatus.menuOpen,
        }
      }
      return {
        menuOpen: true,
        menuVisible: true,
      }
    })
  }

  useEffect(() => {
    if (!menuStatus.menuOpen) {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.focus()
      }
    }
  }, [menuStatus.menuOpen])

  return (
    <>
      <header className="header">
        <div className="header_content">
          <div className="header_links">
            <div className="header_home_link">
              <Link {...focusLink()} to="/">
                <svg
                  className="header_logo"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 60 90"
                >
                  <g className="header_logo_g" fill="black">
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
              </Link>
            </div>

            <div>
              <TransitionGroup className="header_breadcrumbs">
                {path.map(item => {
                  return (
                    <Transition
                      key={item}
                      timeout={{
                        enter: 500,
                        exit: 0,
                      }}
                    >
                      {status => (
                        <div className={`header_breadcrumb ${status}`}>
                          {item}
                        </div>
                      )}
                    </Transition>
                  )
                })}
              </TransitionGroup>

              {path.length > 0 && (
                <div className="header_home_breadcrumb header_breadcrumb">
                  home
                </div>
              )}
            </div>
          </div>
          <div className="header_menuContainer">
            <button
              onClick={toggleMenu}
              ref={buttonRef}
              className="header_btn  "
              {...focusLink()}
            >
              <svg
                aria-label="open menu"
                aria-haspopup="true"
                focusable="false"
                className={`menu_btn ${menuStatus.menuOpen ? "menu_open" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 98 98"
              >
                <g className="header_logo_g">
                  <polygon points="12.48 53.9 49 53.9 49 44.1 0 44.1 12.48 53.9" />
                  <polygon points="85.52 44.1 49 44.1 49 53.9 98 53.9 85.52 44.1" />

                  <polygon points="53.9 12.48 53.9 49 44.1 49 44.1 0 53.9 12.48" />
                  <polygon points="44.1 85.52 44.1 49 53.9 49 53.9 98 44.1 85.52" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {children({ setMenuType })}
      {menuStatus.menuOpen && (
        <Menu
          menuStatus={menuStatus}
          location={location}
          setMenuStatus={setMenuStatus}
          menuType={menuType}
        />
      )}
    </>
  )
}
