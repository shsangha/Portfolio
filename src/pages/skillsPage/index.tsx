import React, { useEffect } from "react"
import "./style.scss"
import Link from "gatsby-plugin-transition-link"

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
        <div className="skills_page_info">
          <div className="skills_page_wrapper">
            <svg
              className="skills_page_logo"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 100"
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "rgb(19,19,189)", stopOpacity: 1 }}
                  />
                  <stop
                    offset="70%"
                    style={{ stopColor: "rgb(210,210,244)", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>

              <g fill="url(#grad)" className="skills_logo_g">
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
            <div className="skills_page_links">
              <a
                className="section_page_link"
                href="https://github.com/shsangha"
              >
                github.com/shsangha
              </a>
              <a
                href="mailto:shawnsangha9@gmail.com"
                className="section_page_link"
              >
                shawnsangha9@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="skills_wrapper">
          <div className="skills_list_wrapper">
            <div className="skills_list">
              {marqeeText.map(item => (
                <div className="perspective_wrapper">
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
