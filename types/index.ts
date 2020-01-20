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
