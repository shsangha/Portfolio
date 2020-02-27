import React, { useEffect, Dispatch, SetStateAction } from "react"
import "./style.scss"
import { Link, graphql, StaticQuery } from "gatsby"
import Footer from "../components/footer"
import SubHeader from "../components/subHead"

import imageSrc from "../../static/img/skillsPage.jpg"

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

export default ({
  setMenuType,
  menuStatus,
}: {
  setMenuType: Dispatch<SetStateAction<string>>
}): React.ReactNode => {
  useEffect(() => {
    //need to implement the strategy where color changes on entry exit with data-color

    if (!menuStatus.menuOpen) {
      const observer = new IntersectionObserver(
        entry => {
          if (!entry[0].isIntersecting) {
            setMenuType("dark")
          } else if (entry[0].isIntersecting) {
            setMenuType("light")
          }
        },
        { threshold: 0.5 }
      )

      const hero = document.querySelector(".skills_page_watch_exit")

      if (hero) {
        observer.observe(hero)
      }

      return (): void => observer.disconnect()
    }
  }, [menuStatus.menuOpen])

  return (
    <StaticQuery
      query={graphql`
        {
          allContentfulSkill(sort: { fields: title, order: ASC }) {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `}
    >
      {({ allContentfulSkill: { edges } }) => {
        return (
          <div className="skills_page ">
            <div className="skills_page_hero skills_page_watch_exit">
              <SubHeader mode="dark">Skills &#38; experience </SubHeader>
            </div>
            <img className="skills_img" src={imageSrc} />

            <div className="skills_wrapper">
              <div className="skills_list_wrapper">
                <div className="skills_list">
                  {edges.map(({ node: { title, slug } }) => {
                    return (
                      <div key={slug} className="perspective_wrapper">
                        <div className="skill_item">
                          <Link
                            className="skill_item_link"
                            to={`/skills/${slug}`}
                          >
                            {title}
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )
      }}
    </StaticQuery>
  )
}
