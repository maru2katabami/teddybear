"use client"

import React, { useEffect } from "react"
import { useZustand } from "@/lib/zustand"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Debug, Physics } from "@react-three/cannon"
import Lights from "@/cmp/lights"
import Ball from "@/cmp/ball"
import Floor from "@/cmp/floor"
import Chair from "@/cmp/chair"
import Bear from "@/cmp/bear"
import Controls from "@/cmp/controls"
import AdBlock from "@/cmp/adblock"

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
        <OrbitControls target={ target } minPolarAngle={ Math.PI/2 * 0.35 } maxPolarAngle={ Math.PI/2 * 0.95 }/>
        <Lights/>
        <Physics gravity={[ 0, -9.82, 0 ]}>
{/* <Debug> */}
          { balls.map(( item ) => (
            <Ball key={ item.id } x={ item.x } y={ item.y }/>
          ))}
          <Floor/>
          <Chair/>
          <Bear/>
{/* </Debug> */}
        </Physics>
      </Canvas>
      <Controls/>
      <AdBlock/>
    </main>
  )
}

export default Page