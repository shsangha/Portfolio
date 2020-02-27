import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import "./styles/belowFold.scss"
import Img, { GatsbyImageProps } from "gatsby-image"
import { CursorContextInterface } from "../types/index"
import IntersectionObserverHOC from "../components/IntersectionObserverTriggerHOC"
import Projects from "../projectsPage/projects"
import Footer from "../components/footer"

const BelowFold = (props: CursorContextInterface): React.ReactNode => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulSkill {
            edges {
              node {
                title
                slug
              }
            }
          }

          contentfulAbout {
            indexplaceholder {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      `}
      render={(data: {
        contentfulAbout: {
          indexplaceholder: GatsbyImageProps
        }
        allContentfulSkill: {
          edges: [
            {
              node: {
                title: string
                slug: string
              }
            }
          ]
        }
      }): React.ReactNode => {
        return (
          <>
            <section className="section_about">
              <div className="section_about_content observe">
                <div
                  className="section_about_img slide_img "
                  {...props.contrastCursor()}
                >
                  <Img fluid={data.contentfulAbout.indexplaceholder.fluid} />
                </div>

                <div className="section_about_desc fadein_text">
                  <h2 className="section_about_header">About</h2>

                  <p className="section_about_text">
                    Hi! I&apos;m Shawn, an enthusiastic, hardworking, and
                    versatile developer currently available for full time hire,
                    and ready to take on a new challenge.
                  </p>
                  <Link
                    to="/about"
                    className="section_about_link"
                    {...props.focusLink()}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </section>
            <h2 className="section_projects_header">Recent Work</h2>
            {/*types issue here is a bug with static query*/}
            <Projects {...props} />
            <section className="section_skills">
              <div className="wrapper">
                <div className="marquee_wrapper observe ">
                  <div className="marquee backward fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title, slug } }) => (
                        <Link
                          to={`/skills/${slug}`}
                          key={title}
                          className="marquee_item"
                        >
                          {title}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="marquee backward fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title, slug } }) => (
                        <Link
                          to={`/skills/${slug}`}
                          key={title}
                          className="marquee_item"
                        >
                          {title}
                        </Link>
                      )
                    )}
                  </div>
                </div>
                <div className="section_skills_content">
                  <h2 className="section_skills_header">Skills</h2>
                  <Link
                    to="/skills"
                    className="section_skills_link"
                    {...props.focusLink()}
                  >
                    Get a detailed breakdown{" "}
                  </Link>
                </div>
                <div className="marquee_wrapper observe ">
                  <div className="marquee forward  fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title, slug } }) => (
                        <Link
                          to={`/skills/${slug}`}
                          key={title}
                          className="marquee_item"
                        >
                          {title}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="marquee forward fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title, slug } }) => (
                        <Link
                          to={`/skills/${slug}`}
                          key={title}
                          className="marquee_item"
                        >
                          {title}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </>
        )
      }}
    />
  )
}

export default IntersectionObserverHOC(BelowFold)
