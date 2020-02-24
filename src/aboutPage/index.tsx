import React, { useEffect, Dispatch, SetStateAction } from "react"
import SubHead from "../components/subHead"
import Footer from "../components/footer"
import "./index.scss"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

export default ({
  setMenuType,
  menuStatus,
}: {
  setMenuType: Dispatch<SetStateAction<string>>
}): React.ReactNode => {
  useEffect(() => {
    const options = {
      threshold: 0.55,
    }

    if (!menuStatus.menuOpen) {
      const observer = new IntersectionObserver(element => {
        if (element[0].isIntersecting) {
          const color = element[0].target.getAttribute("data-color")

          if (color) {
            setMenuType(color)
          }
        } else if (element[0].target.id === "about_page_hero") {
          setMenuType("dark")
        }
      }, options)

      document
        .querySelectorAll(".about_page_ovserver_target")
        .forEach(entry => {
          observer.observe(entry)
        })

      return (): void => {
        observer.disconnect()
      }
    }
  }, [menuStatus.menuOpen])

  return (
    <StaticQuery
      query={graphql`
        query MyQuery {
          contentfulAbout {
            techilike {
              json
            }
            summary {
              json
            }
            notcode {
              json
            }
            looking {
              json
            }
            aboutpageplaceholder {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      `}
    >
      {({ contentfulAbout }) => {
        return (
          <>
            <div className="about_page">
              <div
                id="about_page_hero"
                className="about_content about_page_ovserver_target "
              >
                <SubHead mode="dark">About Me</SubHead>
              </div>
            </div>
            <h2 className="about_page_summary ">
              {documentToReactComponents(contentfulAbout.summary.json, {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (_, children): React.ReactNode => (
                    <p className="about_page_summary_text">{children}</p>
                  ),
                },
              })}
            </h2>
            <div>
              <div
                data-color="light"
                className="about_page_row about_page_ovserver_target"
              >
                <div className="about_page_row_content">
                  <h3 className="about_page_row_header">Looking for</h3>
                  {documentToReactComponents(contentfulAbout.looking.json, {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children): React.ReactNode => (
                        <p className="about_page_row_text">{children}</p>
                      ),
                    },
                  })}
                </div>
              </div>
              <div
                data-color="dark"
                className="about_page_row about_page_ovserver_target"
              >
                <div className="about_page_row_content">
                  <h3 className="about_page_row_header">Tech I like</h3>
                  {documentToReactComponents(contentfulAbout.techilike.json, {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children): React.ReactNode => (
                        <p className="about_page_row_text">{children}</p>
                      ),
                    },
                  })}
                </div>
              </div>
              <div
                data-color="light"
                className="about_page_row about_page_ovserver_target"
              >
                <div className="about_page_row_content">
                  <h3 className="about_page_row_header">When i'm not coding</h3>
                  {documentToReactComponents(contentfulAbout.notcode.json, {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (_, children): React.ReactNode => (
                        <p className="about_page_row_text">{children}</p>
                      ),
                    },
                  })}
                </div>
              </div>
            </div>
            <Footer />{" "}
          </>
        )
      }}
    </StaticQuery>
  )
}
