import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import "./styles/belowFold.scss"
import Img from "gatsby-image"
import { FluidImage } from "../../../types/index"
import IntersectionObserverHOC from "../../components/IntersectionObserverTriggerHOC"
import Projects from "../projectsPage/projects"
import Footer from "../../components/footer"

const BelowFold = (props: {
  location: Location
  contrastCursor: Function
  focusLink: Function
}) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulSkill {
            edges {
              node {
                title
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
      render={(data: { [key: string]: FluidImage }): React.ReactNode => {
        console.log(data)

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
                    I am a fontend developer in Calgary that really enjoys
                    working with both designers and other developers, and am
                    currently available for full time hire.
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

            <Projects {...props} />
            <section className="section_skills">
              <div className="wrapper">
                <div className="marquee_wrapper observe ">
                  <div className="marquee backward fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title } }) => (
                        <div key={title} className="marquee_item">
                          {title}
                        </div>
                      )
                    )}
                  </div>
                  <div className="marquee backward fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title } }) => (
                        <div key={title} className="marquee_item">
                          {title}
                        </div>
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
                      ({ node: { title } }) => (
                        <div key={title} className="marquee_item">
                          {title}
                        </div>
                      )
                    )}
                  </div>
                  <div className="marquee forward fadeMarquee">
                    {data.allContentfulSkill.edges.map(
                      ({ node: { title } }) => (
                        <div key={title} className="marquee_item">
                          {title}
                        </div>
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
