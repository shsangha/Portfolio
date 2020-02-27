import { Dispatch, SetStateAction } from "react"
import { GatsbyImageProps } from "gatsby-image"

export interface ReachRouterLocation extends Location {
  state: {
    key: string
  }
}

export interface MenuState {
  menuOpen: boolean
  menuVisible: boolean
}

export interface FluidImage {
  childImageSharp: {
    fluid: {
      aspectRatio: number
      base64: string
      sizes: string
      src: string
      srcSet: string
    }
  }
}

export interface ImageDataInterface {
  [key: string]: {
    [key: string]: GatsbyImageProps
  }
}

export interface StatefulLocation extends Location {
  state?: {
    animation: string
    target: string
  }
}

export interface MenuProps {
  location: StatefulLocation
  menuStatus: MenuState
  setMenuStatus: Dispatch<SetStateAction<MenuState>>
  menuType: string
  imageData: ImageDataInterface
}

export interface HeaderProps {
  location: Location
  menuStatus: MenuState
  setMenuStatus: Dispatch<SetStateAction<MenuState>>
  imageData: ImageDataInterface
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

export interface CursorContextInterface {
  setMenuType: Dispatch<SetStateAction<string>>
  focusLink: () => void
  contrastCursor: () => void
  menuStatus: {
    menuOpen: boolean
    menuVisible: boolean
  }
}
