import React from "react"
import "./style.scss"

export default () => (
  <footer className="footer">
    <div className="footer_content">
      <img
        className="footer_img"
        src="https://images.unsplash.com/photo-1519002854727-553a98d81c0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      />
      <div className="footer_wrapper">
        <div className="footer_contacts">
          <div className="footer_contact_field">
            <h4 className="footer_contact_label">Phone</h4>
            <a className="footer_contact_link">1 403 978 6723</a>
          </div>
          <div className="footer_contact_field">
            <h4 className="footer_contact_label">Email</h4>
            <a className="footer_contact_link">shawnsangha9@gmail.com</a>
          </div>
          <div className="footer_contact_field">
            <h4 className="footer_contact_label">Github</h4>
            <a className="footer_contact_link">@shasangha</a>
          </div>
        </div>

        <div className="footer_aside">
          <svg
            className="footer_logo"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 90"
          >
            <g className="footer_logo_g" fill="black">
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
          <p className="footer_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis maxime, officiis sit aperiam
          </p>
        </div>
      </div>
    </div>
    <div className="footer_scrolltop">
      <div className="footer_arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.32 80.61">
          <polygon
            className="footer_arrow_svg"
            points="98.32 64.87 98.08 79.97 69.86 42.81 48.83 15.11 28.17 43.08 0.44 80.61 0 65.51 20.66 37.53 48.38 0 49.08 0 77.29 37.16 98.32 64.87"
            fill="#231f20"
          />
        </svg>
      </div>
    </div>
  </footer>
)
