import React, { useEffect } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import "./styles/belowFold.scss"
import Img from "gatsby-image"
import { FluidImage } from "../../../types/index"

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

export default (props: {
  location: Location
  contrastCursor: Function
  focusLink: Function
}) => {
  useEffect(() => {
    let options = {
      threshold: 0.6,
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("intersected")
          observer.unobserve(entry.target)
        }
      })
    }, options)

    document.querySelectorAll(".observe").forEach(item => {
      observer.observe(item)
    })
  })

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
          project1sm: file(relativePath: { eq: "project1sm.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          project2sm: file(relativePath: { eq: "project1sm.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          project3sm: file(relativePath: { eq: "project1sm.jpg" }) {
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
          project2lg: file(relativePath: { eq: "project1sm.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          project3lg: file(relativePath: { eq: "project1sm.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          contactFooter: file(relativePath: { eq: "contactFooter.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={(data: { [key: string]: FluidImage }) => {
        const [project1Sources, project2Sources, project3Sources] = [
          1,
          2,
          3,
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
            <section className="section_projects">
              <h2 className="section_projects_header">Recent Work</h2>
              <div className="section_projects_content">
                <div className="section_projects_list">
                  <div className="section_projects_project observe">
                    <Img
                      fluid={project1Sources}
                      className="section_projects_img slide_img "
                    />

                    <h3 className="section_projects_title fadein_text ">
                      Lorem ipsum dolor,
                    </h3>
                  </div>
                  <div className="section_projects_project observe">
                    <Img
                      fluid={project2Sources}
                      className="section_projects_img slide_img  "
                    />
                    <h3 className="section_projects_title fadein_text">
                      Lorem ipsum dolor,
                    </h3>
                  </div>
                  <div className="section_projects_project observe">
                    <Img
                      fluid={project3Sources}
                      className="section_projects_img slide_img "
                    />
                    <h3 className="section_projects_title fadein_text">
                      Lorem ipsum dolor,
                    </h3>
                  </div>
                </div>
                <a
                  href="https://github.com/shsangha"
                  className="section_projects_link"
                  {...props.focusLink()}
                >
                  More projects
                </a>
              </div>
            </section>
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
            <section className="section_contact  observe">
              <div className="section_contact_wrapper">
                <div className="section_contact_logo_wrapper">
                  <svg
                    className="section_contact_logo"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 90"
                  >
                    <g className="header_logo_g" fill="black">
                      <polygon
                        points="12.46 0.25 49.55 0.25 38.85 15.84 13.38 15.84 23.71 45.49 13.38 59.29 0.27 17.12 12.46 0.25"
                        strokeMiterlimit="10"
                        strokeWidth="0.49"
                      />
                      <polygon
                        points="24.43 45.77 34.22 31.46 50.27 71.59 37.35 90.25 2.1 90.25 13.36 74.14 35.69 74.66 24.43 45.77"
                        strokeMiterlimit="10"
                        strokeWidth="0.49"
                      />
                    </g>
                  </svg>
                </div>
                <h2 className="section_contact_header">Contact</h2>
                <div className="section_contact_content fadein_text">
                  <h3 className="section_contact_desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    quisquam nobis debitis cumque fugit
                  </h3>
                  <div className="section_contact_links ">
                    <div className="section_contact_field">
                      <h4 className="section_contact_label">Email</h4>
                      <a
                        href="mailto:shawnsangha9@gmail.com"
                        className="section_contact_value"
                        {...props.focusLink()}
                      >
                        shawnsangha9@gmail.com
                      </a>
                    </div>
                    <div className="section_contact_field">
                      <h4 className="section_contact_label">Phone</h4>
                      <a
                        href="tel:1-403-978-6723"
                        className="section_contact_value"
                        {...props.focusLink()}
                      >
                        403 978 6723
                      </a>
                    </div>
                    <div className="section_contact_field">
                      <h4 className="section_contact_label">Github</h4>
                      <a
                        href="https://github.com/shsangha"
                        className="section_contact_value"
                        {...props.focusLink()}
                      >
                        @shsangha
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <Img
                style={{ position: "absolute" }}
                fluid={data.contactFooter.childImageSharp.fluid}
                className="section_contact_img slide_img "
              />
            </section>
          </>
        )
      }}
    />
  )
}
