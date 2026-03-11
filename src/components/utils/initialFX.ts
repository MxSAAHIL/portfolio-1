import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.body.style.backgroundColor = "#0b080c";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      delay: 0.1,
    }
  );
}
