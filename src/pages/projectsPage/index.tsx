import React from "react"

import IntersectionObserverTriggerHOC from "../../components/IntersectionObserverTriggerHOC"
import Projects from "./projects"
import SubHead from "../../components/subHead"

const ProjectsPage = IntersectionObserverTriggerHOC(Projects)

export default props => (
  <>
    <SubHead>Recent work</SubHead>
    <ProjectsPage {...props} />
  </>
)
