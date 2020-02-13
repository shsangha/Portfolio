import React from "react"
import "./style.scss"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import card from "../../../static/img/card.jpg"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

interface Props {
  context: {
    id: string
  }
  data: {
    allContentfulProject: {
      edges: [
        {
          node: {
            id: string
            title: string
            heroImage: any
          }
        }
      ]
    }
  }
}

const Work = ({
  data: { contentfulProject },
  pageContext: { next },
}: Props): React.ReactNode => {
  return (
    <div className="work_template">
      <div className="work_template_hero_wrapper">
        <Img
          className="work_template_hero_image"
          fluid={contentfulProject.heroimage.fluid}
        />
        <h1 className="work_template_hero_title">{contentfulProject.title}</h1>
      </div>
      <div className="work_template_summary_wrapper">
        <div className="work_template_summary">
          {documentToReactComponents(contentfulProject.summary.json, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (_, children): React.ReactNode => (
                <p className="work_template_summary_text">{children}</p>
              ),
            },
          })}
          {contentfulProject.github && (
            <a
              href={contentfulProject.github || ""}
              className="work_template_summary_link"
            >
              View on Gihub
            </a>
          )}
          {contentfulProject.site && (
            <a
              href={contentfulProject.site || ""}
              className="work_template_summary_link"
            >
              View website
            </a>
          )}
        </div>
        <div className="work_template_skills_wrapper">
          <h2 className="work_template_skills_header">Skills Used:</h2>
          <ul className="work_template_skills_list">
            {contentfulProject.skills.map((skill: string) => (
              <Link
                key={skill}
                to={`/skills/${skill.toLowerCase()}`}
                className="work_template_skills_list_item"
              >
                {skill}
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {contentfulProject.list && (
        <div className="work_template_repeat_section">
          {contentfulProject.list.map((item, index) => (
            <div key={item.title} className="work_template_repeating_entry">
              {documentToReactComponents(item.description.json, {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (_, children): React.ReactNode => (
                    <h3 className="work_template_repeating_entry_header">
                      {children}
                    </h3>
                  ),
                },
              })}
              <div className="work_template_repeating_main_image_wrapper">
                {item.video ? (
                  <video
                    preload="none"
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="work_template_repeating_main_image"
                  >
                    <source
                      src={item.video.file.url}
                      type={item.video.file.contentType}
                    />
                  </video>
                ) : item.photo ? (
                  <Img
                    className="work_template_repeating_main_image"
                    fluid={item.photo.fluid}
                  />
                ) : null}
              </div>
              {item.mobileimages && (
                <div className="work_template_repeating_images">
                  {item.mobileimages.map(image => (
                    <div
                      key={image.title}
                      className="work_template_repeating_mobile_image_wrapper"
                    >
                      <Img
                        className="work_template_repeating_mobile_image"
                        fluid={image.fluid}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {contentfulProject.footerimage && (
        <div className="work_template_footer_image_wrapper">
          <Img
            className="work_template_footer_image"
            fluid={contentfulProject.footerimage.fluid}
          />
        </div>
      )}

      {next && next.slug && (
        <div className="work_tempate_next_wrapper">
          <Link
            className="work_template_next_link even"
            to={`/work/${next.slug}`}
          >
            <span className="work_template_next_link_text">Next</span>
            <span className="work_template_next_link_project_title">
              {next.title}
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Work

export const query = graphql`
  query WorkPage($id: String!) {
    contentfulProject(id: { eq: $id }) {
      id
      title
      github
      site
      skills
      list {
        title
        description {
          json
        }
        mobileimages {
          title
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        photo {
          fluid(maxWidth: 1000) {
            ...GatsbyContentfulFluid
          }
        }
        video {
          file {
            url
            contentType
          }
        }
      }
      summary {
        json
      }
      heroimage {
        fluid(maxWidth: 1200) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
