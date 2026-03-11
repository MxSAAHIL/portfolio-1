import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);
  const introClip = THREE.AnimationClip.findByName(
    gltf.animations,
    "introAnimation"
  );

  const introAction = introClip ? mixer.clipAction(introClip) : null;
  if (introAction) {
    introAction.setLoop(THREE.LoopOnce, 1);
    introAction.clampWhenFinished = true;
    introAction.timeScale = 1;
    introAction.play();
  } else {
    console.error('Animation "introAnimation" not found');
  }

  function startIntro() {
    introAction?.reset().play();

    setTimeout(() => {
      const blink = THREE.AnimationClip.findByName(gltf.animations, "Blink");
      if (!blink) return;
      const blinkAction = mixer.clipAction(blink);
      blinkAction.play().fadeIn(0.5);
    }, 2500);
  }
  function hover(gltf: GLTF, hoverDiv: HTMLDivElement) {
    const eyeBrowUpAction = createBoneAction(
      gltf,
      mixer,
      "browup",
      eyebrowBoneNames
    );
    let isHovering = false;
    if (eyeBrowUpAction) {
      eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
      eyeBrowUpAction.clampWhenFinished = true;
      eyeBrowUpAction.enabled = true;
    }
    const onHoverFace = () => {
      if (eyeBrowUpAction && !isHovering) {
        isHovering = true;
        eyeBrowUpAction.reset();
        eyeBrowUpAction.enabled = true;
        eyeBrowUpAction.setEffectiveWeight(4);
        eyeBrowUpAction.fadeIn(0.5).play();
      }
    };
    const onLeaveFace = () => {
      if (eyeBrowUpAction && isHovering) {
        isHovering = false;
        eyeBrowUpAction.fadeOut(0.6);
      }
    };
    if (!hoverDiv) return;
    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);
    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }
  return { mixer, startIntro, hover };
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clip: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  const AnimationClip = THREE.AnimationClip.findByName(gltf.animations, clip);
  if (!AnimationClip) {
    console.error(`Animation "${clip}" not found in GLTF file.`);
    return null;
  }

  const filteredClip = filterAnimationTracks(AnimationClip, boneNames);

  return mixer.clipAction(filteredClip);
};

const filterAnimationTracks = (
  clip: THREE.AnimationClip,
  boneNames: string[]
): THREE.AnimationClip => {
  const filteredTracks = clip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  );

  return new THREE.AnimationClip(
    clip.name + "_filtered",
    clip.duration,
    filteredTracks
  );
};

export default setAnimations;
