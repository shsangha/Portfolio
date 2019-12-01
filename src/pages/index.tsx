import React from "react"
import "../scss/pages/index.scss"
import { graphql } from "gatsby"
import { FluidImage } from "../../types/index"
import Img from "gatsby-image"
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

interface Props {
  data: {
    [key: string]: FluidImage
  }
}

export default ({ data }: Props) => {
  const [img1Sources, img2Sources, img3Sources] = [1, 2, 3].map(idx => {
    return [
      data[`landing${idx}Mobile`].childImageSharp.fluid,
      {
        ...data[`landing${idx}Desktop`].childImageSharp.fluid,
        media: "(orientation:landscape)",
      },
    ]
  })

  return (
    <>
      <section className="section_landing">
        <h1 className="landing_heroText">
          Shawn Sangha &mdash; A curious and versitle front-end developer with a
          love for web-performacnce and design.
        </h1>
        <div className="img1">
          <Img
            style={{ position: "absolute", width: "100%" }}
            className="test"
            fluid={img1Sources}
          />
        </div>
        <div className="img2">
          <Img
            style={{ position: "absolute", width: "100%" }}
            className="test"
            fluid={img2Sources}
          />
        </div>
        <div className="img3">
          <Img
            style={{ position: "absolute", width: "100%" }}
            className="test"
            fluid={img3Sources}
          />
        </div>
      </section>
      <section className="section_about">
        <h2 className="section_about_header">About</h2>
        <div className="section_about_content">
          <img
            className="section_about_img"
            src="https://images.unsplash.com/photo-1449867727329-3294ea016353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <div className="section_about_desc">
            <p className="section_about_text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
              asperiores quod quasi corporis quam a? Cumque quis autem unde
              commodi doloribus aliquid modi eos. Beatae, facere odio. Fugiat,
              quo mollitia!
            </p>
            <a className="section_about_link">LINKS</a>
          </div>
        </div>
      </section>
      <section className="section_projects">
        <h2 className="section_projects_header">Recent Work</h2>
        <div className="section_projects_content">
          <div className="section_projects_list">
            <div className="section_projects_project">
              <img
                className="section_projects_img"
                src="https://images.unsplash.com/photo-1449867727329-3294ea016353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
              <p className="section_projects_title">Lorem ipsum dolor,</p>
            </div>
            <div className="section_projects_project">
              <img
                className="section_projects_img"
                src="https://images.unsplash.com/photo-1449867727329-3294ea016353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
              <p className="section_projects_title">Lorem ipsum dolor,</p>
            </div>
            <div className="section_projects_project">
              <img
                className="section_projects_img"
                src="https://images.unsplash.com/photo-1449867727329-3294ea016353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
              <p className="section_projects_title">Lorem ipsum dolor,</p>
            </div>
          </div>
          <a className="section_projects_link">LINKS</a>
        </div>
      </section>
      <section className="section_skills">
        <div className="wrapper">
          <div className="marquee_wrapper ">
            <div className="marquee backward">
              {marqeeText.map(item => (
                <div className="card">{item}</div>
              ))}
            </div>
            <div className="marquee backward">
              {marqeeText.map(item => (
                <div className="card">{item}</div>
              ))}
            </div>
          </div>

          <div className="section_skills_content">
            <h2 className="section_skills_header">Core Competencies</h2>
            <a className="section_skills_link">Get a detailed breakdown </a>
          </div>

          <div className="marquee_wrapper ">
            <div className="marquee forward">
              {marqeeText.map(item => (
                <div className="card">{item}</div>
              ))}
            </div>
            <div className="marquee forward">
              {marqeeText.map(item => (
                <div className="card">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section_contact">
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
          <div className="section_contact_header">Contact</div>
          <div className="section_contact_content">
            <h3 className="section_contact_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
              quisquam nobis debitis cumque fugit
            </h3>
            <div className="section_contact_links">
              <div className="section_contact_field">
                <h4 className="section_contact_label">Label</h4>
                <a className="section_contact_value">Value</a>
              </div>{" "}
              <div className="section_contact_field">
                <h4 className="section_contact_label">Label</h4>
                <a className="section_contact_value">Value</a>
              </div>{" "}
              <div className="section_contact_field">
                <h4 className="section_contact_label">Label</h4>
                <a className="section_contact_value">Value</a>
              </div>
            </div>
          </div>
        </div>
        <img
          className="section_contact_img"
          src="https://images.unsplash.com/photo-1497412159286-98933a0e327f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />{" "}
      </section>
    </>
  )
}

export const query = graphql`
  query {
    landing1Mobile: file(relativePath: { eq: "landing1sm.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    landing1Desktop: file(relativePath: { eq: "landing1lg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    landing2Mobile: file(relativePath: { eq: "landing2sm.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    landing2Desktop: file(relativePath: { eq: "landing2lg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    landing3Mobile: file(relativePath: { eq: "landing3sm.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    landing3Desktop: file(relativePath: { eq: "landing3lg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
