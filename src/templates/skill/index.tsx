import React from "react"
import SubHead from "../../components/subHead"
import { Link, graphql } from "gatsby"
import "./style.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"

const Skill = ({ data: { contentfulSkill }, pageContext: { next } }) => (
  <div className="skill_template">
    <SubHead>{contentfulSkill.title}</SubHead>
    <div className="skill_template_summary_wrapper">
      {documentToReactComponents(contentfulSkill.summary.json, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_, children) => (
            <p className="skill_template_summary">{children}</p>
          ),
          [INLINES.HYPERLINK]: (_, children): React.ReactNode => (
            <a className="skill_template_link">{children}</a>
          ),
        },
      })}
    </div>
    {next && next.slug && (
      <div className="skill_tempate_next_wrapper">
        <Link
          className="skill_template_next_link even"
          to={`/skills/${next.slug}`}
        >
          <span className="skill_template_next_link_text">Next</span>
          <span className="skill_template_next_link_project_title">
            {next.title}
          </span>
        </Link>
      </div>
    )}
  </div>
)

export default Skill

export const query = graphql`
  query($id: String!) {
    contentfulSkill(id: { eq: $id }) {
      title
      summary {
        json
      }
    }
  }
`
