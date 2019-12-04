import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import "./styles/belowFold.scss"
import Img from "gatsby-image"
import { FluidImage } from "../../../types/index"
import IntersectionObserverHOC from "../../components/IntersectionObserverTriggerHOC"
import Contact from "../contactPage/contact"
import Projects from "../projectsPage/projects"

const marqeeText = [
  "React",
  "Jest",
  "Cypress",
  "Node",
  "RxJs",
  "Java",
  "MongoDB",
  "Postgres",
  "Scss",
  "Javascript",
  "Typescript",
  "Docker",
  "Elasticsearch",
  "Gatsby",
  "GraphQL",
  "Redux",
  "Express",
  "XD",
  "Illustrator",
  "HTML",
  "A11Y",
]

const BelowFold = (props: {
  location: Location
  contrastCursor: Function
  focusLink: Function
}) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          aboutImage: file(relativePath: { eq: "placeholder.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={(data: { [key: string]: FluidImage }) => {
        return (
          <>
            <section className="section_about">
              <h2 className="section_about_header">About</h2>
              <div className="section_about_content observe">
                <div
                  className="section_about_img slide_img "
                  {...props.contrastCursor()}
                >
                  <Img fluid={data.aboutImage.childImageSharp.fluid} />
                </div>

                <div className="section_about_desc fadein_text">
                  <p className="section_about_text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Beatae, asperiores quod quasi corporis quam a? Cumque quis
                    autem unde commodi doloribus aliquid modi eos. Beatae,
                    facere odio. Fugiat, quo mollitia!
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
            <Projects {...props} />
            <section className="section_skills">
              <div className="wrapper">
                <div className="marquee_wrapper observe ">
                  <div className="marquee backward fadeMarquee">
                    {marqeeText.map(item => (
                      <div className="marquee_item">{item}</div>
                    ))}
                  </div>
                  <div className="marquee backward fadeMarquee">
                    {marqeeText.map(item => (
                      <div className="marquee_item">{item}</div>
                    ))}
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
                    {marqeeText.map(item => (
                      <div className="marquee_item">{item}</div>
                    ))}
                  </div>
                  <div className="marquee forward fadeMarquee">
                    {marqeeText.map(item => (
                      <div className="marquee_item">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <Contact {...props} />
          </>
        )
      }}
    />
  )
}

export default IntersectionObserverHOC(BelowFold)
