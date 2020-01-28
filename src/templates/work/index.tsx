import React from "react"
import "./style.scss"
import { Link } from "gatsby"
import card from "../../../static/img/card.jpg"

const Work = () => (
  <div className="work_template">
    <div className="work_template_hero_wrapper">
      <img className="work_template_hero_image" src={card} />
      <h1 className="work_template_hero_title">Project Title</h1>
    </div>
    <div className="work_template_summary_wrapper">
      <div className="work_template_summary">
        <p className="work_template_summary_text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          ipsam provident nesciunt consequuntur, amet ad illo eius sapiente
          ducimus facere omnis maxime! Distinctio sint officiis sed rerum, totam
          est eligendi.
        </p>
        <a className="work_template_summary_link">View on Gihub</a>
        <a className="work_template_summary_link">View website</a>
      </div>
      <div className="work_template_skills_wrapper">
        <h2 className="work_template_skills_header">Skills Used:</h2>
        <ul className="work_template_skills_list">
          <li className="work_template_skills_list_item">Some</li>
          <li className="work_template_skills_list_item">Skill</li>
          <li className="work_template_skills_list_item">List</li>
        </ul>
      </div>
    </div>

    <div className="work_template_main_image_wrapper">
      <img className="work_template_main_image" src={card} alt=" " />
    </div>

    <div className="work_template_repeat_section">
      {[1, 2].map((_, index) => (
        <div key={index} className="work_template_repeating_entry">
          <h3 className="work_template_repeating_entry_header">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsum
          </h3>
          <div className="work_template_repeating_main_image_wrapper">
            <img
              className="work_template_repeating_main_image"
              src={card}
              alt=" "
            />
          </div>
          <div className="work_template_repeating_images">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="work_template_repeating_mobile_image_wrapper"
              >
                <img
                  className="work_template_repeating_mobile_image"
                  src={card}
                  alt=" "
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="work_template_footer_image_wrapper">
      <img className="work_template_footer_image" src={card} alt=" " />
    </div>
    <div className="work_tempate_next_wrapper">
      <Link className="work_template_next_link even" to="/projects">
        <span className="work_template_next_link_text">Next</span>
        <span className="work_template_next_link_project_title">
          Project Title
        </span>
      </Link>
    </div>
  </div>
)

export default Work
