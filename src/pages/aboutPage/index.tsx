import React, { useState } from "react"
import "./index.scss"

export default (props: any) => {
  const [selected, setSelected] = useState<"dev" | "person">("dev")

  return (
    <div className="about_container">
      <h2 className="about_header">Shawn Sangha</h2>
      <div className="about_img_wrapper" {...props.contrastCursor()}>
        <img
          className={`about_img about_img_person  ${
            selected === "person" ? "about_img_selected" : ""
          }`}
          src="https://images.unsplash.com/photo-1542914119-031b7a0dbb8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className={`about_img about_img_dev  ${
            selected === "dev" ? "about_img_selected" : ""
          }`}
          src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />
      </div>
      <div className="about_nav">
        <button
          onClick={() => {
            setSelected("dev")
          }}
          className={`about_nav_btn ${
            selected === "dev" ? "about_nav_selected" : ""
          }`}
          {...props.focusLink()}
        >
          The Dev
        </button>
        <button
          onClick={() => setSelected("person")}
          className={`about_nav_btn ${
            selected === "person" ? "about_nav_selected" : ""
          }`}
          {...props.focusLink()}
        >
          The Person
        </button>
      </div>
      <div className="about_desc">
        {selected === "dev" ? (
          <p className={`about_desc_text`}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
            impedit nihil veniam cum architecto perspiciatis labore assumenda
            excepturi delectus, optio voluptatibus ut, pariatur magnam hic vero
            veritatis iusto ullam. Quasi!
          </p>
        ) : (
          <p className={`about_desc_text`}>
            suscipit corporis perferendis, sint recusandae aspernatur impedit,
            ut dolorum quidem soluta.
          </p>
        )}
      </div>
    </div>
  )
}
