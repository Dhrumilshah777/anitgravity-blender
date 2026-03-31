"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";

const MODEL_URL = "/jewelery_-_ring-_diamonds.glb";

type DragState = {
  dragging: boolean;
  lastX: number;
  lastY: number;
  rotationX: number;
  rotationY: number;
  targetRotationX: number;
  targetRotationY: number;
};

function BlenderModel({
  scrollProgress,
  dragRef,
}: {
  scrollProgress: number;
  dragRef: React.RefObject<DragState>;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<Group>(null);
  const progressRef = useRef(scrollProgress);
  const isMobileRef = useRef(false);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => {
      isMobileRef.current = media.matches;
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (group) {
      const progress = progressRef.current;
      const isMobile = isMobileRef.current;
      const drag = dragRef.current;

      if (drag) {
        const smoothing = isMobile ? 0.16 : 0.12;
        drag.rotationY += (drag.targetRotationY - drag.rotationY) * smoothing;
        drag.rotationX += (drag.targetRotationX - drag.rotationX) * smoothing;
      }

      const dragRotationX = drag?.rotationX ?? 0;
      const dragRotationY = drag?.rotationY ?? 0;

      group.rotation.y =
        progress * Math.PI * (isMobile ? 2.5 : 4) + dragRotationY;
      group.rotation.x += (dragRotationX - group.rotation.x) * 0.12;
      group.position.y = isMobile
        ? 0.15 - progress * 0.45
        : 1 - progress * 2.4;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

type BlenderSceneProps = {
  /** Override default height (e.g. `h-full` when inside a layout cell). */
  className?: string;
  /** 0 = top of page, 1 = bottom; used for scroll rotation. */
  scrollProgress?: number;
};

export function BlenderScene({
  className,
  scrollProgress = 0,
}: BlenderSceneProps = {}) {
  const dragRef = useRef<DragState>({
    dragging: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  return (
    <div
      className={
        className
          ? `w-full touch-none select-none ${className}`
          : "h-[min(70vh,560px)] w-full touch-none select-none"
      }
      style={{ touchAction: "none" }}
      onPointerDown={(event) => {
        event.preventDefault();
        dragRef.current.dragging = true;
        dragRef.current.lastX = event.clientX;
        dragRef.current.lastY = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragRef.current.dragging) return;
        event.preventDefault();

        const deltaX = event.clientX - dragRef.current.lastX;
        const deltaY = event.clientY - dragRef.current.lastY;
        dragRef.current.lastX = event.clientX;
        dragRef.current.lastY = event.clientY;
        const isTouch = event.pointerType === "touch";
        dragRef.current.targetRotationY += deltaX * (isTouch ? 0.01 : 0.008);
        dragRef.current.targetRotationX = Math.max(
          -0.9,
          Math.min(
            0.9,
            dragRef.current.targetRotationX + deltaY * (isTouch ? 0.005 : 0.004),
          ),
        );
      }}
      onPointerUp={(event) => {
        event.preventDefault();
        dragRef.current.dragging = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={(event) => {
        event.preventDefault();
        dragRef.current.dragging = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
    >
      <Canvas
        className="h-full w-full"
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        onCreated={({ scene, gl }) => {
          scene.background = null;
          gl.setClearAlpha(0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <hemisphereLight
            args={["#ffffff", "#d4d4d8", 1.5]}
            position={[0, 5, 0]}
          />
          <directionalLight position={[4, 6, 5]} intensity={2} />
          <Bounds fit clip margin={1.2}>
            <BlenderModel scrollProgress={scrollProgress} dragRef={dragRef} />
          </Bounds>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
