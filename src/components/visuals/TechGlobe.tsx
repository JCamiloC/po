"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { TECHNOLOGIES } from "@/lib/technologies";
import { LOGO_PATHS } from "@/lib/logoPaths";

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

    // Esfera base con wireframe sutil
    const sphereGeo = new THREE.SphereGeometry(3, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#334155"), // slate-700
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Esfera glow: ligera ampliación y blending aditivo para halo suave
    const glowGeo = new THREE.SphereGeometry(3.01, 48, 48);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#60a5fa"), // blue-400
      transparent: true,
      opacity: 0.08,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowSphere);

    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Crear sprites para tecnologías distribuidas en la esfera
    const group = new THREE.Group();
    const radius = 3.2;
    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];

    TECHNOLOGIES.forEach((t, idx) => {
      let tex: THREE.Texture;
      const iconPath = LOGO_PATHS[t.id] || t.icon;
      if (iconPath) {
        tex = loader.load(iconPath);
      } else {
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
        tex = new THREE.CanvasTexture(canvas);
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.push(tex);
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

  // Interacción de arrastre + autorrotación con inercia
  let isDown = false;
  let lastX = 0;
  let lastY = 0;
  let velX = 0; // velocidad angular por input
  let velY = 0;
  const baseSpeedY = 0.003; // autorrotación suave

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
      velY += dx * 0.0025; // sensibilidad horizontal
      velX += dy * 0.0025; // sensibilidad vertical
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

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;
    const tick = () => {
      // Pausar animación si reduce motion o pestaña oculta
      if (media.matches || document.hidden) {
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
        return;
      }
      // Autorrotación + inercia con amortiguación
      group.rotation.y += baseSpeedY + velY;
      group.rotation.x += velX;
      // Limitar inclinación X para evitar voltear en exceso
      const maxTilt = Math.PI / 3;
      group.rotation.x = Math.max(-maxTilt, Math.min(maxTilt, group.rotation.x));
      // Amortiguar velocidades
      velX *= 0.92;
      velY *= 0.92;
      const t = performance.now() * 0.001;
      // Sincronizar esfera y halo con el grupo para que todo parezca un conjunto
      sphere.rotation.y = group.rotation.y * 1.0;
      sphere.rotation.x = group.rotation.x * 1.0;
      glowSphere.rotation.y = group.rotation.y * 1.0;
      glowSphere.rotation.x = group.rotation.x * 1.0;
      // Pequeña variación de opacidad para efecto de brillo
      glowMat.opacity = 0.06 + Math.abs(Math.sin(t * 0.6)) * 0.04;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      // Liberar recursos de sprites
      group.children.forEach((child) => {
        const sprite = child as THREE.Sprite;
        const mat = sprite.material as THREE.SpriteMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
      group.clear();
      textures.forEach((t) => t.dispose());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-96 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur relative" />
  );
};

export default TechGlobe;
