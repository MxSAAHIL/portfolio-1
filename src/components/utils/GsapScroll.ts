import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let intensityInterval: number | null = null;
let monitorFlickerTween: gsap.core.Tween | null = null;

const triggerIds = ["char-landing", "char-about", "char-what", "char-what-mobile"];

function resetCharacterTriggers() {
  triggerIds.forEach((id) => {
    ScrollTrigger.getById(id)?.kill();
  });
  monitorFlickerTween?.kill();
  monitorFlickerTween = null;
  if (intensityInterval !== null) {
    window.clearInterval(intensityInterval);
    intensityInterval = null;
  }
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  resetCharacterTriggers();
  gsap.set([".landing-container", ".about-me", ".character-model"], {
    clearProps: "opacity,transform,y,x",
  });

  let intensity = 0;
  intensityInterval = window.setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      id: "char-landing",
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      id: "char-about",
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      id: "char-what",
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  let screenLight: THREE.Mesh | null = null;
  let monitor: THREE.Mesh | null = null;

  character?.children.forEach((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const material = child.material as THREE.MeshStandardMaterial;
        material.transparent = true;
        material.opacity = 0;
        if (material.name === "Material.027") {
          monitor = child;
          material.color.set("#FFFFFF");
        }
      });
    }

    if (object.name === "screenlight") {
      if (!(object instanceof THREE.Mesh)) return;
      const material = object.material as THREE.MeshStandardMaterial;
      material.transparent = true;
      material.opacity = 0;
      material.emissive.set("#C8BFFF");
      monitorFlickerTween = gsap.to(material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
        repeat: -1,
        repeatRefresh: true,
      });
      screenLight = object;
    }
  });

  const neckBone = character?.getObjectByName("spine005");

  if (window.innerWidth > 1024) {
    if (!character || !neckBone || !monitor || !screenLight) return;
    const desktopMonitor = monitor as THREE.Mesh;
    const desktopScreenLight = screenLight as THREE.Mesh;
    const desktopMonitorMaterial =
      desktopMonitor.material as THREE.MeshStandardMaterial;
    const desktopScreenLightMaterial =
      desktopScreenLight.material as THREE.MeshStandardMaterial;

    tl1
      .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
      .to(camera.position, { z: 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    tl2
      .to(
        camera.position,
        { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
        0
      )
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
      .to(desktopMonitorMaterial, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .to(desktopScreenLightMaterial, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
      .fromTo(
        ".what-box-in",
        { display: "none" },
        { display: "flex", duration: 0.1, delay: 6 },
        0
      )
      .fromTo(
        desktopMonitor.position,
        { y: -10, z: 2 },
        { y: 0, z: 0, delay: 1.5, duration: 3 },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

    tl3
      .fromTo(
        ".character-model",
        { y: "0%" },
        { y: "-100%", duration: 4, ease: "none", delay: 1 },
        0
      )
      .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
      .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    return;
  }

  if (character) {
    const mobileTimeline = gsap.timeline({
      scrollTrigger: {
        id: "char-what-mobile",
        trigger: ".what-box-in",
        start: "top 70%",
        end: "bottom top",
      },
    });
    mobileTimeline.to(".what-box-in", { display: "flex", duration: 0.1 }, 0);
  }
}
