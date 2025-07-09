import React from "react"
import { SingleCanvasBox } from "./SingleCanvasBox"

function App() {
    const params = new URLSearchParams(window.location.search)

    const size = parseInt(params.get("size") || "300", 10)
    const petalColor = "#" + (params.get("petalColor") || "ff69b4")
    const centerColor = "#" + (params.get("centerColor") || "ffcc00")
    const speed = parseFloat(params.get("speed") || "0.05")
    const segmentCount = parseInt(params.get("segmentCount") || "3", 10)
    const segmentSpacing = parseFloat(params.get("segmentSpacing") || "0.45")
    const petalCount = parseInt(params.get("petalCount") || "6", 10)
    const petalDistance = parseFloat(params.get("petalDistance") || "1.2")
    const particleSizeX = parseFloat(params.get("particleSizeX") || "0.15")
    const particleSizeY = parseFloat(params.get("particleSizeY") || "0.15")
    const particleSizeZ = parseFloat(params.get("particleSizeZ") || "0.15")

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
                size={size}
                petalColor={petalColor}
                centerColor={centerColor}
                speed={speed}
                segmentCount={segmentCount}
                segmentSpacing={segmentSpacing}
                petalCount={petalCount}
                petalDistance={petalDistance}
                particleSizeX={particleSizeX}
                particleSizeY={particleSizeY}
                particleSizeZ={particleSizeZ}
            />
        </div>
    )
}

export default App