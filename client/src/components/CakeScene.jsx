import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function addDollop(group, geometry, material, radius, y, count, scale = 1) {
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    const dollop = new THREE.Mesh(geometry, material);
    dollop.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    dollop.scale.set(0.32 * scale, 0.2 * scale, 0.32 * scale);
    dollop.rotation.y = -angle;
    dollop.castShadow = true;
    group.add(dollop);
  }
}

export default function CakeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const cake = new THREE.Group();
    cake.rotation.set(-0.06, -0.35, -0.025);
    scene.add(cake);

    const ivory = new THREE.MeshPhysicalMaterial({
      color: '#f7dfce',
      roughness: 0.45,
      clearcoat: 0.18,
      clearcoatRoughness: 0.65,
    });
    const berry = new THREE.MeshPhysicalMaterial({
      color: '#8f4359',
      roughness: 0.34,
      clearcoat: 0.48,
      clearcoatRoughness: 0.28,
    });
    const blush = new THREE.MeshPhysicalMaterial({
      color: '#cf98a5',
      roughness: 0.42,
      clearcoat: 0.26,
    });
    const cream = new THREE.MeshStandardMaterial({ color: '#fff5e9', roughness: 0.72 });
    const gold = new THREE.MeshStandardMaterial({
      color: '#d9ad57',
      roughness: 0.28,
      metalness: 0.62,
    });

    const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.15, 0.16, 72), cream);
    plate.position.y = -1.18;
    plate.castShadow = true;
    plate.receiveShadow = true;
    cake.add(plate);

    const lower = new THREE.Mesh(new THREE.CylinderGeometry(1.72, 1.78, 1.35, 72), ivory);
    lower.position.y = -0.45;
    lower.castShadow = true;
    lower.receiveShadow = true;
    cake.add(lower);

    const lowerGlaze = new THREE.Mesh(new THREE.CylinderGeometry(1.76, 1.74, 0.17, 72), blush);
    lowerGlaze.position.y = 0.24;
    lowerGlaze.castShadow = true;
    cake.add(lowerGlaze);

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.24, 1.1, 72), ivory);
    upper.position.y = 0.78;
    upper.castShadow = true;
    upper.receiveShadow = true;
    cake.add(upper);

    const upperGlaze = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.2, 0.17, 72), berry);
    upperGlaze.position.y = 1.36;
    upperGlaze.castShadow = true;
    cake.add(upperGlaze);

    const sphere = new THREE.SphereGeometry(1, 24, 18);
    addDollop(cake, sphere, cream, 1.43, 0.22, 18, 1.08);
    addDollop(cake, sphere, cream, 0.94, 1.38, 14, 0.92);

    const dripGeometry = new THREE.CapsuleGeometry(0.095, 0.34, 6, 12);
    [0.15, 0.72, 1.32, 1.92, 2.58, 3.18, 3.83, 4.5, 5.12, 5.72].forEach((angle, index) => {
      const drip = new THREE.Mesh(dripGeometry, index % 2 ? blush : berry);
      drip.position.set(Math.cos(angle) * 1.74, -0.02 - (index % 3) * 0.09, Math.sin(angle) * 1.74);
      drip.scale.y = 0.72 + (index % 4) * 0.16;
      drip.castShadow = true;
      cake.add(drip);
    });

    [0.4, 1.25, 2.05, 2.82, 3.62, 4.38, 5.15, 5.78].forEach((angle, index) => {
      const pearl = new THREE.Mesh(sphere, index % 3 === 0 ? gold : berry);
      pearl.position.set(Math.cos(angle) * 0.72, 1.59 + (index % 2) * 0.08, Math.sin(angle) * 0.72);
      pearl.scale.setScalar(index % 3 === 0 ? 0.11 : 0.19);
      pearl.castShadow = true;
      cake.add(pearl);
    });

    const centerBerry = new THREE.Mesh(sphere, berry);
    centerBerry.position.set(0, 1.68, 0);
    centerBerry.scale.setScalar(0.25);
    centerBerry.castShadow = true;
    cake.add(centerBerry);

    const candleGeometry = new THREE.CylinderGeometry(0.045, 0.045, 0.72, 18);
    const flameMaterial = new THREE.MeshStandardMaterial({
      color: '#ffd35a',
      emissive: '#ff8a36',
      emissiveIntensity: 1.8,
    });
    [-0.42, 0, 0.42].forEach((x, index) => {
      const candle = new THREE.Mesh(candleGeometry, index === 1 ? blush : cream);
      candle.position.set(x, 1.95 + (index === 1 ? 0.08 : 0), -0.03);
      candle.castShadow = true;
      cake.add(candle);

      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 12), flameMaterial);
      flame.position.set(x, candle.position.y + 0.43, -0.03);
      flame.scale.y = 1.45;
      cake.add(flame);
    });

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.65, 72),
      new THREE.ShadowMaterial({ color: '#51454a', opacity: 0.14 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.29;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.HemisphereLight('#fffaf4', '#9eaa9a', 2.2));

    const keyLight = new THREE.DirectionalLight('#fff2df', 4.4);
    keyLight.position.set(-4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 16;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#c8d6c5', 2.4);
    rimLight.position.set(5, 2, -4);
    scene.add(rimLight);

    const pointer = new THREE.Vector2();
    let scrollProgress = 0;
    let baseX = 0;
    let frameId;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      baseX = width < 700 ? 0 : 1.55;
      camera.position.set(0, width < 700 ? 1.32 : 0.3, width < 700 ? 12.8 : 8.7);
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handlePointerLeave = () => pointer.set(0, 0);

    const handleScroll = () => {
      const hero = canvas.closest('.landing-hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
    };

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      cake.rotation.y += ((-0.35 + pointer.x * 0.24 + scrollProgress * 1.05) - cake.rotation.y) * 0.045;
      cake.rotation.x += ((-0.06 - pointer.y * 0.1 + scrollProgress * 0.08) - cake.rotation.x) * 0.045;
      cake.position.y = Math.sin(elapsed * 0.85) * 0.055 + scrollProgress * 0.18;
      cake.position.x = baseX + pointer.x * 0.08;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    resize();
    handleScroll();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="landing-cake-canvas"
      role="img"
      aria-label="Interactive three-dimensional raspberry celebration cake"
    />
  );
}
