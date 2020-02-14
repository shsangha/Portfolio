import gsap from "gsap"

export const exiting = (
  tl: GSAPTimeline | null = null,
  node: HTMLElement
): GSAPTimeline => {
  if (tl && tl.progress() < 1) {
    tl.progress(0)
    tl.clear()
  }
  return gsap
    .timeline()
    .set(node, { zIndex: -1 })
    .to(".menu_content", 1.5, { y: "+=20rem" })
}

export const entering = (
  tl: GSAPTimeline | null = null,
  node: HTMLElement,
  cb
): GSAPTimeline => {
  if (tl && tl.progress() < 1) {
    tl.progress(0)
    tl.clear()
  }

  return gsap
    .timeline()
    .set(node, { zIndex: 5, y: "100%" })
    .set(".transition_cover", { zIndex: 4 })
    .to(".transition_cover", 1, {
      opacity: 0.6,
    })
    .to(node, 1, {
      y: "-=100%",
    })
    .add(() => cb())
    .set(".transition_cover", { opacity: 0, zIndex: -1 })
    .set(node, { zIndex: 2 })
}
