import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import "./style.scss"

export default (props: any) => (
  <StaticQuery
    query={graphql`
      query {
        contactFooter: file(relativePath: { eq: "contactFooter.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
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
    )}
  />
)
