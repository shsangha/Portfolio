import React, { useEffect, Dispatch, SetStateAction } from "react"
import Img from "gatsby-image"
import SubHead from "../components/subHead"
import { StaticQuery, graphql, Link } from "gatsby"
import "./style.scss"

export default ({
  setMenuType,
  focusLink,
  menuStatus,
}: {
  setMenuType: Dispatch<SetStateAction<string>>
  focusLink: () => {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}): React.ReactNode => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulProject(
            sort: { order: ASC, fields: priority }
            limit: 3
          ) {
            nodes {
              title
              slug
              preview {
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      `}
      render={({ allContentfulProject: { nodes } }) => {
        return (
          <>
            <section className="section_projects">
              <div className="section_projects_content">
                <div className="section_projects_list">
                  {nodes.map(({ title, slug, preview: { fluid } }) => (
                    <div
                      key={title}
                      className="section_projects_project observe"
                    >
                      <Link
                        to={`/work/${slug}`}
                        {...focusLink()}
                        className="section_projects_wrapper"
                      >
                        <Img
                          fluid={fluid}
                          className="section_projects_img slide_img  "
                        />
                      </Link>
                      <Link
                        to={`/work/${slug}`}
                        {...focusLink()}
                        className="section_projects_title fadein_text "
                      >
                        {title}
                      </Link>
                    </div>
                  ))}
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
