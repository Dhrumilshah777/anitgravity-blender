"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";
import type { Group } from "three";

type ModelView = {
  modelUrl: string;
  scale?: number;
  verticalOffset?: number;
};

type DragState = {
  dragging: boolean;
  armed: boolean;
  lastX: number;
  lastY: number;
  startX: number;
  startY: number;
  rotationX: number;
  rotationY: number;
  targetRotationX: number;
  targetRotationY: number;
};

function BlenderModel({
  model,
  dragRef,
}: {
  model: ModelView;
  dragRef: React.RefObject<DragState>;
}) {
  const { scene } = useGLTF(model.modelUrl);
  const groupRef = useRef<Group>(null);
  const normalizedScale = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (!Number.isFinite(maxDim) || maxDim <= 0) return 1;

    // Scale each model so its longest dimension is ~2.2 world units.
    const target = 2.2;
    return target / maxDim;
  }, [scene]);

  useFrame((state) => {
    const group = groupRef.current;
    if (group) {
      const drag = dragRef.current;
      const time = state.clock.getElapsedTime();

      if (drag) {
        const smoothing = 0.12;
        drag.rotationY += (drag.targetRotationY - drag.rotationY) * smoothing;
        drag.rotationX += (drag.targetRotationX - drag.rotationX) * smoothing;
      }

      const dragRotationX = drag?.rotationX ?? 0;
      const dragRotationY = drag?.rotationY ?? 0;

      group.rotation.y = time * 0.35 + dragRotationY;
      group.rotation.x += (dragRotationX - group.rotation.x) * 0.12;
      group.position.y = Math.sin(time * 0.9) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Center
        scale={(model.scale ?? 1) * normalizedScale}
        position={[0, model.verticalOffset ?? 0, 0]}
      >
        <primitive object={scene} />
      </Center>
    </group>
  );
}

type BlenderSceneProps = {
  /** Override default height (e.g. `h-full` when inside a layout cell). */
  className?: string;
  model: ModelView;
};

export function BlenderScene({ className, model }: BlenderSceneProps) {
  const dragRef = useRef<DragState>({
    dragging: false,
    armed: false,
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0,
    rotationX: 0,
    rotationY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  return (
    <div
      className={
        className
          ? `w-full select-none ${className}`
          : "h-[min(70vh,560px)] w-full select-none"
      }
      style={{ touchAction: "pan-y" }}
      onPointerDown={(event) => {
        dragRef.current.armed = true;
        dragRef.current.dragging = false;
        dragRef.current.startX = event.clientX;
        dragRef.current.startY = event.clientY;
        dragRef.current.lastX = event.clientX;
        dragRef.current.lastY = event.clientY;
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag.armed) return;

        const deltaX = event.clientX - dragRef.current.lastX;
        const deltaY = event.clientY - dragRef.current.lastY;
        dragRef.current.lastX = event.clientX;
        dragRef.current.lastY = event.clientY;

        const totalX = event.clientX - drag.startX;
        const totalY = event.clientY - drag.startY;
        const threshold = event.pointerType === "touch" ? 10 : 4;

        if (!drag.dragging) {
          // Only start rotating when the user is clearly dragging horizontally.
          if (Math.abs(totalX) > Math.abs(totalY) && Math.abs(totalX) > threshold) {
            drag.dragging = true;
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
          } else {
            return; // allow normal page scroll
          }
        }

        event.preventDefault();
        const isTouch = event.pointerType === "touch";
        drag.targetRotationY += deltaX * (isTouch ? 0.012 : 0.01);
        drag.targetRotationX = Math.max(
          -0.9,
          Math.min(0.9, drag.targetRotationX + deltaY * (isTouch ? 0.006 : 0.005)),
        );
      }}
      onPointerUp={(event) => {
        const drag = dragRef.current;
        drag.armed = false;
        if (drag.dragging) {
          event.preventDefault();
          drag.dragging = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onPointerCancel={(event) => {
        const drag = dragRef.current;
        drag.armed = false;
        if (drag.dragging) {
          event.preventDefault();
          drag.dragging = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
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
            <BlenderModel model={model} dragRef={dragRef} />
          </Bounds>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

