import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    try {
      return await new Promise<GLTF>((resolve, reject) => {
        loader.load(
          "/models/character.glb",
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child) => {
              if (!(child instanceof THREE.Mesh)) return;
              child.castShadow = true;
              child.receiveShadow = true;
              child.frustumCulled = true;
            });
            character.getObjectByName("footR")!.position.y = 3.36;
            character.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
            resolve(gltf);
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
