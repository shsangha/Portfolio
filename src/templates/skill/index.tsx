import React from "react"
import SubHead from "../../components/subHead"
import { Link } from "gatsby"
import "./style.scss"

import card from "../../../static/img/card.jpg"

const Skill = () => (
  <div className="skill_template">
    <SubHead>Skill Name</SubHead>
    <div className="skills_template_summary_wrapper">
      <div className="skill_template_lists_wrapper">
        <div className="skill_template_xp_wrapper">
          <h3>Experience:</h3>
          <p>5 years</p>
        </div>
        <div className="skill_template_learned_from">
          <h4>Favourite learning resources</h4>
          <ul className="skill_template_learned_list">
            <li className="skill_template_learned_list_item">- a</li>
            <li className="skill_template_learned_list_item">- b</li>
            <li className="skill_template_learned_list_item">- c</li>
            <li className="skill_template_learned_list_item">- e</li>
            <li className="skill_template_learned_list_item">- g</li>
          </ul>
        </div>
      </div>
      <div className="skill_template_summary_wrapper">
        <p className="skill_template_summary">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          nulla, pariatur molestiae omnis nostrum assumenda et, adipisci
          deserunt aperiam maiores eligendi voluptates autem? Fuga eos, earum
          numquam voluptate non animi?
        </p>
      </div>
    </div>

    <h3 className="skill_template_projects_header">Code Samples</h3>
    {[1, 2, 3, 4].map((_, index) => (
      <div className="skills_template_project_wrapper" key={index}>
        <div className="skills_template_list_item">
          <img className="skills_template_project_img" src={card} />
          <div className="skills_template_project_detail_wrapper">
            <h4 className="skills_template_project_title">Title</h4>
            <p className="skills_template_project_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam eaque assumenda, dolor adipisci inventore vel placeat
              ipsa, quam illo vitae architecto!
            </p>
            <Link
              className="skills_template_project_link"
              to="/projects/project"
            >
              details
            </Link>
            <a
              className="skills_template_project_link"
              href="http://github.com"
            >
              website
            </a>
            <a
              className="skills_template_project_link"
              href="http://github.com"
            >
              github
            </a>
          </div>
        </div>
      </div>
    ))}
    <div className="skills_tempate_next_wrapper">
      <Link className="skills_template_next_link even" to="/projects">
        <span className="skills_template_next_link_text">Next</span>
        <span className="skills_template_next_link_project_title">
          Project Title
        </span>
      </Link>
    </div>
  </div>
)

export default Skill
