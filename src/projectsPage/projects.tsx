import React from "react"
import Img, { GatsbyImageProps } from "gatsby-image"

import { CursorContextInterface } from "../types"
import { StaticQuery, graphql, Link } from "gatsby"
import "./style.scss"

// eslint-disable-next-line react/display-name
export default ({ focusLink }: CursorContextInterface): React.ReactNode => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulProject(
            sort: { order: ASC, fields: priority }
            limit: 4
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
      render={({
        allContentfulProject: { nodes },
      }: {
        allContentfulProject: {
          nodes: [{ title: string; slug: string; preview: GatsbyImageProps }]
        }
      }): React.ReactNode => {
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
