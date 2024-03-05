import React, { useEffect, useRef } from "react"
import { useZustand } from "@/lib/zustand"
import { useGLTF } from "@react-three/drei"
import { useConeTwistConstraint, useSphere } from "@react-three/cannon"

const TeddyBear = () => {

  const { setTarget, impulse } = useZustand()

  const { nodes } = useGLTF("/glb/teddybear.glb")

  const param = { mass: 0.1, position: [ 0, 2.5, 0 ], rotation: [ -0.2, 0, 0 ], solver: { tolerance: 0.01, iterations: 5 }}

  const [ body, api ] = useSphere(() => ({ ...param, args: [ 0.35 ]}), useRef())
  const [ head ] = useSphere(() => ({ ...param, args: [ 0.35 ]}), useRef())
  const [ earL ] = useSphere(() => ({ ...param, args: [ 0.12 ]}), useRef())
  const [ earR ] = useSphere(() => ({ ...param, args: [ 0.12 ]}), useRef())
  const [ tail ] = useSphere(() => ({ ...param, args: [ 0.12 ]}), useRef())
  const [ topL ] = useSphere(() => ({ ...param, args: [ 0.08 ]}), useRef())
  const [ topR ] = useSphere(() => ({ ...param, args: [ 0.08 ]}), useRef())
  const [ botL ] = useSphere(() => ({ ...param, args: [ 0.08 ]}), useRef())
  const [ botR ] = useSphere(() => ({ ...param, args: [ 0.08 ]}), useRef())
  const [ armL ] = useSphere(() => ({ ...param, args: [ 0.14 ]}), useRef())
  const [ armR ] = useSphere(() => ({ ...param, args: [ 0.14 ]}), useRef())
  const [ legL ] = useSphere(() => ({ ...param, args: [ 0.18 ]}), useRef())
  const [ legR ] = useSphere(() => ({ ...param, args: [ 0.18 ]}), useRef())

  const constaint = { axisA: [ 0, 1, 0 ], axisB: [ 0, 1, 0 ], angle: 0, twistAngle: Math.PI / 8, maxMultiplier: 1500 }

  useConeTwistConstraint( body, head, { pivotA: [ 0, 0.30, 0 ], pivotB: [ 0, -0.30, 0 ], ...constaint })
  useConeTwistConstraint( head, earL, { pivotA: [ 0.15, 0.13, 0 ], pivotB: [ -0.15, -0.13, 0 ], ...constaint })
  useConeTwistConstraint( head, earR, { pivotA: [ -0.15, 0.13, 0 ], pivotB: [ 0.15, -0.13, 0 ], ...constaint })
  useConeTwistConstraint( body, tail, { pivotA: [ 0, -0.13, -0.10 ], pivotB: [ 0, 0, 0.20 ], ...constaint })
  useConeTwistConstraint( body, topL, { pivotA: [ 0.13, 0.10, 0 ], pivotB: [ -0.13, -0.10, 0 ], ...constaint })
  useConeTwistConstraint( body, topR, { pivotA: [ -0.13, 0.10, 0 ], pivotB: [ 0.13, -0.10, 0 ], ...constaint })
  useConeTwistConstraint( body, botL, { pivotA: [ 0.16, -0.15, 0 ], pivotB: [ -0.16, 0, 0 ], ...constaint })
  useConeTwistConstraint( body, botR, { pivotA: [ -0.16, -0.15, 0 ], pivotB: [ 0.16, 0, 0 ], ...constaint })
  useConeTwistConstraint( topL, armL, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.4, 0 ], ...constaint })
  useConeTwistConstraint( topR, armR, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.4, 0 ], ...constaint })
  useConeTwistConstraint( botL, legL, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.6, 0 ], ...constaint })
  useConeTwistConstraint( botR, legR, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.6, 0 ], ...constaint })

  useEffect(() => {
    api.position.subscribe( position => setTarget( position ))
  }, [])

  useEffect(() => {
    api.applyImpulse( impulse, [ 0, 0, 0 ])
  }, [ impulse ])

  return (
    <group>
      <primitive object={ nodes.body } ref={ body }/>
      <primitive object={ nodes.head } ref={ head }/>
      <primitive object={ nodes.earL } ref={ earL }/>
      <primitive object={ nodes.earR } ref={ earR }/>
      <primitive object={ nodes.tail } ref={ tail }/>
      <primitive object={ nodes.armL } ref={ armL }/>
      <primitive object={ nodes.armR } ref={ armR }/>
      <primitive object={ nodes.legL } ref={ legL }/>
      <primitive object={ nodes.legR } ref={ legR }/>
    </group>
  )
}

export default TeddyBear