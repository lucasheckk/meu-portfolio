import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#2D1057", // roxo escuro — fundo discreto
  autoAnimate = true, // anima sozinho quando o mouse está parado
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // ─── Mouse global: funciona mesmo com canvas sem pointer-events ────────
  const globalMouse = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      globalMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      lastMoveTime.current = Date.now();
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    const w = viewport.width || 100;
    const h = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      const z = (Math.random() - 0.5) * 20;
      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v } = state;
    const idle = autoAnimate && Date.now() - lastMoveTime.current > 2000;

    let destX, destY;
    if (idle) {
      const t = state.clock.getElapsedTime();
      destX = Math.sin(t * 0.5) * (v.width / 4);
      destY = Math.cos(t * 0.5 * 2) * (v.height / 4);
    } else {
      destX = (globalMouse.current.x * v.width) / 2;
      destY = (globalMouse.current.y * v.height) / 2;
    }

    const globalRot = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((p, i) => {
      p.t += p.speed / 2;

      const proj = 1 - p.cz / 50;
      const tgX = destX * proj;
      const tgY = destY * proj;

      const dx = p.mx - tgX;
      const dy = p.my - tgY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tx = p.mx,
        ty = p.my,
        tz = p.mz * depthFactor;

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRot;
        const wave = Math.sin(p.t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const dev = p.randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const r = ringRadius + wave + dev;

        tx = tgX + r * Math.cos(angle);
        ty = tgY + r * Math.sin(angle);
        tz = p.mz * depthFactor + Math.sin(p.t) * waveAmplitude * depthFactor;
      }

      p.cx += (tx - p.cx) * lerpSpeed;
      p.cy += (ty - p.cy) * lerpSpeed;
      p.cz += (tz - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(tgX, tgY, p.cz);
      dummy.rotateX(Math.PI / 2);

      const dRing = Math.abs(Math.hypot(p.cx - tgX, p.cy - tgY) - ringRadius);
      const scale = Math.max(0, Math.min(1, 1 - dRing / 10));
      const final =
        scale *
        (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;

      dummy.scale.setScalar(final);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && (
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      )}
      {particleShape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

const Antigravity = (props) => (
  // pointer-events: none → canvas não bloqueia cliques, mas o useEffect
  // do Inner escuta window.mousemove e funciona perfeitamente
  <Canvas
    camera={{ position: [0, 0, 50], fov: 35 }}
    style={{ pointerEvents: "none" }}
  >
    <AntigravityInner {...props} />
  </Canvas>
);

export default Antigravity;
