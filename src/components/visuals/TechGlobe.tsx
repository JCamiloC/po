"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { TECHNOLOGIES } from "@/lib/technologies";

// Globo 3D interactivo con arrastre del mouse y logos simplificados como sprites de texto.
const TechGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.innerHTML = ""; // limpia si se remonta
    el.appendChild(renderer.domElement);

    // Esfera base
    const sphereGeo = new THREE.SphereGeometry(3, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1e293b"),
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Crear sprites para tecnologías distribuidas en la esfera
    const group = new THREE.Group();
    const radius = 3.2;
    TECHNOLOGIES.forEach((t, idx) => {
      const canvas = document.createElement("canvas");
      const size = 256;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 90px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.label, size / 2, size / 2 + 8);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      const phi = Math.acos(-1 + (2 * (idx + 0.5)) / TECHNOLOGIES.length);
      const theta = Math.sqrt(TECHNOLOGIES.length * Math.PI) * phi;
      sprite.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi)
      );
      const scale = 0.9;
      sprite.scale.set(scale, scale, scale);
      group.add(sprite);
    });
    scene.add(group);

    // Interacción de arrastre
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetRotY += dx * 0.005;
      targetRotX += dy * 0.005;
    };
    const onUp = () => { isDown = false; };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const resize = () => {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", resize);

    const animate = () => {
      // Lerp para suavizar
      group.rotation.y += (targetRotY - group.rotation.y) * 0.07;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.07;
      sphere.rotation.y += 0.002; // rotación lenta base
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-96 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur relative" />
  );
};

export default TechGlobe;
