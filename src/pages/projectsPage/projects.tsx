import React, { useEffect, Dispatch, SetStateAction } from "react"
import Img from "gatsby-image"
import SubHead from "../../components/subHead"
import { StaticQuery, graphql, Link } from "gatsby"
import "./style.scss"

export default ({
  setMenuType,
  focusLink,
}: {
  setMenuType: Dispatch<SetStateAction<string>>
  focusLink: () => {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}): React.ReactNode => {
  useEffect(() => {
    setMenuType("dark")
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query {
          project1sm: file(relativePath: { eq: "project1sm.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          project1lg: file(relativePath: { eq: "project1lg.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => {
        const [project1Sources, project2Sources, project3Sources] = [
          1,
          1,
          1,
        ].map(idx => {
          return [
            data[`project${idx}sm`].childImageSharp.fluid,

            {
              ...data[`project${idx}lg`].childImageSharp.fluid,
              media: "(minWidth: 56.25em)",
            },
          ]
        })

        return (
          <>
            <SubHead>Recent work</SubHead>

            <section className="section_projects">
              <div className="section_projects_content">
                <div className="section_projects_list">
                  <div className="section_projects_project observe">
                    <div {...focusLink()} className="section_projects_wrapper">
                      <Img
                        fluid={project1Sources}
                        className="section_projects_img slide_img "
                      />
                    </div>
                    <Link
                      to="/projects/a"
                      className="section_projects_title fadein_text "
                    >
                      Lorem ipsum dolor,
                    </Link>
                  </div>
                  <div className="section_projects_project observe">
                    <div {...focusLink()} className="section_projects_wrapper">
                      <Img
                        fluid={project2Sources}
                        className="section_projects_img slide_img  "
                      />
                    </div>
                    <Link
                      to="/projects/a"
                      className="section_projects_title fadein_text "
                    >
                      Lorem ipsum dolor,
                    </Link>
                  </div>
                  <div className="section_projects_project observe">
                    <div {...focusLink()} className="section_projects_wrapper">
                      {" "}
                      <Img
                        fluid={project3Sources}
                        className="section_projects_img slide_img "
                      />
                    </div>
                    <Link to="" className="section_projects_title fadein_text">
                      Lorem ipsum dolor,
                    </Link>
                  </div>
                </div>
                <a
                  href="https://github.com/shsangha"
                  className="section_projects_link"
                  {...focusLink()}
                >
                  More projects
                </a>
              </div>
            </section>
          </>
        )
      }}
    />
  )
}
