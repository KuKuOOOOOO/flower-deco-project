import React from "react";
import { SingleCanvasBox } from "./SingleCanvasBox";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SingleCanvasBox
        size={300}
        petalColor="#ff69b4"
        centerColor="#ffcc00"
        speed={0.05}
        segmentCount={3}
        segmentSpacing={0.45}
        petalCount={6}
        petalDistance={1.2}
        particleSizeX={0.15}
        particleSizeY={0.15}
        particleSizeZ={0.15}
      />
    </div>
  );
}

