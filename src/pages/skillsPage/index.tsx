import React, { useEffect } from "react"
import "./style.scss"
import { Link } from "gatsby"
import SubHeader from "../../components/subHead"

import imageSrc from "../../../static/img/skillsPage.jpg"

const marqeeText = [
  "A11Y",
  "Cypress",
  "Docker",
  "Elastic",
  "Express",
  "Gatsby",
  "GraphQL",
  "HTML",
  "Illustrator",
  "Java",
  "Javascript",
  "Jest",
  "MongoDB",
  "Node",
  "Postgres",
  "React",
  "Redux",
  "RxJs",
  "Scss",
  "Typescript",
  "XD",
]

export default () => {
  return (
    <>
      <div className="skills_page">
        <div className="skills_page_hero">
          <SubHeader mode="dark">Skills &#38; experience </SubHeader>
        </div>
        <img className="skills_img" src={imageSrc} />

        <div className="skills_wrapper">
          <div className="skills_list_wrapper">
            <div className="skills_list">
              {marqeeText.map(item => (
                <div key={item} className="perspective_wrapper">
                  <div className="skill_item">
                    <Link className="skill_item_link" to="/">
                      {item}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
