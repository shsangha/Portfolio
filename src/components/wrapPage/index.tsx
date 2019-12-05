import React from "react"

import { CursorContext } from "../../layouts"

export default (Component: React.ElementType) => (props: any) => (
  <CursorContext.Consumer>
    {values => <Component {...props} {...values} />}
  </CursorContext.Consumer>
)
