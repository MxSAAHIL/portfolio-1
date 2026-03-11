import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";

const hasAnyToken = (value: string, tokens: string[]) =>
  tokens.some((token) => value.includes(token));

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

              if (!(child.material instanceof THREE.MeshStandardMaterial)) return;
              const meshName = child.name.toLowerCase();
              const parentName = child.parent?.name?.toLowerCase() ?? "";
              const semanticName = `${meshName} ${parentName}`;
              const materialName = child.material.name?.toLowerCase() ?? "";

              const isBodyTop = hasAnyToken(semanticName, ["shirt", "body"]);
              const isPant = hasAnyToken(semanticName, ["pant"]);
              const isShoe = hasAnyToken(semanticName, ["shoe", "sole"]);
              const isDefaultMaterial = materialName === "default";
              const isSkinArea =
                hasAnyToken(semanticName, ["face", "head", "ear", "neck", "hand"]) &&
                !hasAnyToken(semanticName, ["eye", "hair"]);
              const isLikelySkinByFallback =
                isDefaultMaterial &&
                !isBodyTop &&
                !isPant &&
                !isShoe &&
                !hasAnyToken(semanticName, [
                  "eye",
                  "hair",
                  "brow",
                  "screen",
                  "keys",
                  "glass",
                  "iron",
                  "ground",
                ]);

              if (isBodyTop) {
                // Matte blue shirt/body finish.
                const bodyMat = child.material.clone();
                bodyMat.color.set("#1e3a8a");
                bodyMat.roughness = 0.8;
                bodyMat.metalness = 0.05;
                bodyMat.clearcoat = 0.06;
                bodyMat.clearcoatRoughness = 0.78;
                bodyMat.emissive.set("#0d1a45");
                bodyMat.emissiveIntensity = 0.03;
                child.material = bodyMat;
                return;
              }

              if (isPant) {
                // Matte grey-black pants to match shirt.
                const pantMat = child.material.clone();
                pantMat.color.set("#1d1f26");
                pantMat.roughness = 0.82;
                pantMat.metalness = 0.05;
                pantMat.clearcoat = 0.06;
                pantMat.clearcoatRoughness = 0.75;
                pantMat.emissive.set("#07080b");
                pantMat.emissiveIntensity = 0.03;
                child.material = pantMat;
                return;
              }

              if (isShoe) {
                // Red shoes.
                const shoeMat = child.material.clone();
                shoeMat.color.set("#b81f2f");
                shoeMat.roughness = 0.48;
                shoeMat.metalness = 0.08;
                shoeMat.clearcoat = 0.18;
                shoeMat.clearcoatRoughness = 0.42;
                shoeMat.emissive.set("#2b0810");
                shoeMat.emissiveIntensity = 0.06;
                child.material = shoeMat;
                return;
              }

              if (isSkinArea || isLikelySkinByFallback) {
                // Warm light-yellow skin tone for visible face/skin areas.
                const faceMat = child.material.clone();
                faceMat.color.set("#f1d486");
                faceMat.roughness = 0.46;
                faceMat.metalness = 0.02;
                faceMat.clearcoat = 0.14;
                faceMat.clearcoatRoughness = 0.5;
                faceMat.emissive.set("#2d2613");
                faceMat.emissiveIntensity = 0.04;
                child.material = faceMat;
              }
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
