import React, { useEffect, Dispatch, SetStateAction } from "react"
import SubHead from "../../components/subHead"
import Footer from "../../components/footer"
import "./index.scss"

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
    <>
      <div className="about_page">
        <div
          id="about_page_hero"
          className="about_content about_page_ovserver_target "
        >
          <SubHead mode="dark">About Me</SubHead>
        </div>
      </div>
      <img
        className="about_img"
        src="https://images.unsplash.com/photo-1533075377664-f5c0cbc5a91c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      />

      <h2 className="about_page_summary ">
        <p className="about_page_summary_text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
          atque nostrum doloribus et dolore mollitia voluptas incidunt
          cupiditate soluta alias magni, assumenda fugiat veritatis itaque
          repellat in recusandae ipsam. Esse.
        </p>
      </h2>
      <div>
        <div
          data-color="light"
          className="about_page_row about_page_ovserver_target"
        >
          <div className="about_page_row_content">
            <h3 className="about_page_row_header">How I work</h3>
            <p className="about_page_row_text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              repellendus laudantium laboriosam quasi perferendis molestiae.
              Voluptatibus doloremque, consequatur recusandae necessitatibus
              corrupti eum ut molestiae blanditiis corporis dicta adipisci saepe
              numquam.
            </p>
          </div>
        </div>
        <div
          data-color="dark"
          className="about_page_row about_page_ovserver_target"
        >
          <div className="about_page_row_content">
            <h3 className="about_page_row_header">How I work</h3>
            <p className="about_page_row_text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              repellendus laudantium laboriosam quasi perferendis molestiae.
              Voluptatibus doloremque, consequatur recusandae necessitatibus
              corrupti eum ut molestiae blanditiis corporis dicta adipisci saepe
              numquam.
            </p>
          </div>
        </div>
        <div
          data-color="light"
          className="about_page_row about_page_ovserver_target"
        >
          <div className="about_page_row_content">
            <h3 className="about_page_row_header">How I work</h3>
            <p className="about_page_row_text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              repellendus laudantium laboriosam quasi perferendis molestiae.
              Voluptatibus doloremque, consequatur recusandae necessitatibus
              corrupti eum ut molestiae blanditiis corporis dicta adipisci saepe
              numquam.
            </p>
          </div>
        </div>
        <div
          data-color="dark"
          className="about_page_row about_page_ovserver_target"
        >
          <div className="about_page_row_content">
            <h3 className="about_page_row_header">How I work</h3>
            <p className="about_page_row_text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              repellendus laudantium laboriosam quasi perferendis molestiae.
              Voluptatibus doloremque, consequatur recusandae necessitatibus
              corrupti eum ut molestiae blanditiis corporis dicta adipisci saepe
              numquam.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
