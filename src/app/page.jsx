"use client"

import React, { useEffect } from "react"
import { useZustand } from "@/lib/zustand"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Debug, Physics } from "@react-three/cannon"
import PointLights from "@/cmp/pointlights"
import WallandFloor from "@/cmp/wall&floor"
import SwingChair from "@/cmp/swingchair"
import TeddyBear from "@/cmp/teddybear"
import Ball from "@/cmp/ball"
import Controls from "@/cmp/controls"

const Page = () => {

  const { target, balls, setBalls, shoots } = useZustand()

  const handleBall = e => {
    if( shoots ) {
      const newBall = { id: Date.now(), x: e.clientX, y: e.clientY }
      balls.length >= 10 ? setBalls([ ...balls.slice(1), newBall ]): setBalls([ ...balls, newBall ])
    }
  }

  useEffect(() => setBalls([]), [ shoots ])

  return (
    <main>
      <Canvas onPointerUp={ handleBall }>
        <OrbitControls target={ target } minPolarAngle={ Math.PI/2 * 0.05 } maxPolarAngle={ Math.PI/2 * 0.95 }/>
        <PointLights/>
        <Physics gravity={[ 0, -9.82, 0 ]}>
          <Debug>
          <WallandFloor/>
          <SwingChair/>
          <TeddyBear/>
          </Debug>
          { balls.map(( item ) => (
            <Ball key={ item.id } x={ item.x } y={ item.y }/>
          ))}
        </Physics>
      </Canvas>
      <Controls/>
    </main>
  )
}

export default Page