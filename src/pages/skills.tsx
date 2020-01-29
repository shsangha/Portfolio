import React from "react"

import WrapPage from "../components/wrapPage"
import Skills from "./skillsPage"

const SkillsPage = WrapPage(Skills)

export default props => (
  <>
    <SkillsPage {...props} />
  </>
)
