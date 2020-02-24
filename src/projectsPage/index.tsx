import React from "react"
import IntersectionObserverHOC from "../components/IntersectionObserverTriggerHOC"
import Projects from "./projects"
import SubHead from "../components/subHead"
import Footer from "../components/footer"

const Page = IntersectionObserverHOC(Projects)

export default props => (
  <>
    <SubHead>Recent work</SubHead>
    <Page {...props} />
    <Footer />
  </>
)
