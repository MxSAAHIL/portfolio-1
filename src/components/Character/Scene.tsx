import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/loadingContext";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/loadingProgress";
import { setCharTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvasNode = canvasDiv.current;
    if (!canvasNode) return;

    const rect = canvasNode.getBoundingClientRect();
    const scene = sceneRef.current;
    scene.background = null;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    canvasNode.querySelectorAll("canvas").forEach((node) => node.remove());
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasNode.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, rect.width / rect.height, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let loadedCharacter: THREE.Object3D | null = null;
    let stopHover: (() => void) | undefined;
    let rafId: number | null = null;
    let introTimer: number | null = null;
    let disposed = false;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!gltf || disposed) return;

      const animations = setAnimations(gltf);
      if (hoverDivRef.current) {
        stopHover = animations.hover(gltf, hoverDivRef.current);
      }

      mixer = animations.mixer;
      loadedCharacter = gltf.scene;
      scene.add(loadedCharacter);
      setCharTimeline(loadedCharacter, camera);

      headBone = loadedCharacter.getObjectByName("spine006") || null;
      screenLight = loadedCharacter.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        introTimer = window.setTimeout(() => {
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchStart = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchEnd = (_event: TouchEvent) => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const onResize = () => {
      if (!loadedCharacter) return;
      handleResize(renderer, camera, canvasDiv, loadedCharacter);
    };

    const landingDiv = document.getElementById("landingDiv");
    document.addEventListener("mousemove", onMouseMove);
    landingDiv?.addEventListener("touchstart", onTouchStart, { passive: true });
    landingDiv?.addEventListener("touchmove", onTouchMove, { passive: true });
    landingDiv?.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }

      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      if (introTimer !== null) window.clearTimeout(introTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      stopHover?.();
      progress.clear();

      if (loadedCharacter) {
        scene.remove(loadedCharacter);
      }
      scene.clear();
      renderer.dispose();

      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchmove", onTouchMove);
      landingDiv?.removeEventListener("touchend", onTouchEnd);

      if (canvasNode.contains(renderer.domElement)) {
        canvasNode.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
