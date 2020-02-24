import React, { useEffect, Dispatch, SetStateAction } from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import SubHead from "../components/subHead"
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
        <div className="contact_page">
          <SubHead>Contact</SubHead>

          <section className="section_contact  observe">
            <div className="section_contact_scroll_wrapper">
              <div className="section_contact_wrapper">
                <Img
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    top: "0",
                  }}
                  fluid={data.contactFooter.childImageSharp.fluid}
                  className="section_contact_img  "
                />

                <div className="section_contact_content ">
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
                        {...focusLink()}
                      >
                        shawnsangha9@gmail.com
                      </a>
                    </div>
                    <div className="section_contact_field">
                      <h4 className="section_contact_label">Phone</h4>
                      <a
                        href="tel:1-403-978-6723"
                        className="section_contact_value"
                        {...focusLink()}
                      >
                        403 978 6723
                      </a>
                    </div>
                    <div className="section_contact_field">
                      <h4 className="section_contact_label">Github</h4>
                      <a
                        href="https://github.com/shsangha"
                        className="section_contact_value"
                        {...focusLink()}
                      >
                        @shsangha
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="section_contact_footer">
            <div className="section_contact_footer_content">
              <p className="section_contact_footer_text">
                I am currently searching for my next opportunity. So if you have
                interest in working together please get in touch!
              </p>
            </div>
          </footer>
        </div>
      )}
    />
  )
}
