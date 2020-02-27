/* eslint-disable react/display-name */
import React, { useEffect, Dispatch, SetStateAction } from "react"
import { TimelineLite } from "gsap"
import "./styles/index.scss"
import { graphql, StaticQuery } from "gatsby"
import { FluidImage } from "../../types/index"
import Img from "gatsby-image"
import loadable from "react-loadable"

const BelowFoldContent = loadable({
  loader: () => import("./belowFoldContent"),
  loading: () => null,
})

export default (props: {
  location: Location
  contrastCursor: Function
  focusLink: Function
  setMenuType: Dispatch<SetStateAction<string>>
  menuStatus: any
}): React.ReactNode => {
  useEffect(() => {
    const myTimeline = new TimelineLite()

    myTimeline.staggerFromTo(
      ".intro_header_span",
      0.4,
      {
        opacity: 0,
        y: "4rem",
      },
      { opacity: 1, y: 0 },
      0.2,
      "+=0.3"
    )
  }, [])

  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={(data: { [key: string]: FluidImage }) => {
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
                <span className="intro_header_span">Shawn</span>{" "}
                <span className="intro_header_span">Sangha </span>{" "}
                <span className="intro_header_span">&mdash;</span>{" "}
                <span className="intro_header_span">A </span>{" "}
                <span className="intro_header_span">curious </span>{" "}
                <span className="intro_header_span">and </span>{" "}
                <span className="intro_header_span">versitle </span>{" "}
                <span className="intro_header_span">developer </span>{" "}
                <span className="intro_header_span">with </span>{" "}
                <span className="intro_header_span">a </span>{" "}
                <span className="intro_header_span">love </span>{" "}
                <span className="intro_header_span">for </span>{" "}
                <span className="intro_header_span"> performacnce </span>{" "}
                <span className="intro_header_span">and </span>{" "}
                <span className="intro_header_span">design.</span>{" "}
              </h1>
              <div className="landing_img1 " {...props.contrastCursor()}>
                <Img
                  style={{ width: "100%" }}
                  className="landing_img intro_img_fade"
                  fluid={img1Sources}
                />
              </div>
              <div className="landing_img2 " {...props.contrastCursor()}>
                <Img
                  style={{ width: "100%" }}
                  className="landing_img intro_img_fade"
                  fluid={img2Sources}
                />
              </div>
              <div className="landing_img3" {...props.contrastCursor()}>
                <Img
                  style={{ width: "100%" }}
                  className="landing_img intro_img_fade"
                  fluid={img3Sources}
                />
              </div>
            </section>
            <BelowFoldContent {...props} />
          </>
        )
      }}
    />
  )
}
