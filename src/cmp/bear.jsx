import React, { useEffect, useMemo, useRef } from "react"
import { useZustand } from "@/lib/zustand"
import { useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useConeTwistConstraint, useSphere } from "@react-three/cannon"

const Bear = () => {

  const { start, setStart, target, setTarget, impulse } = useZustand()

  const { camera } = useThree()

  const { nodes } = useGLTF("/glb/teddybear.glb")

  const param = { mass: 0.1, position: [ -5, 2.3, 0 ], solver: { tolerance: 0.01, iterations: 5 }}

  const [ body, api ] = useSphere(() => ({ ...param, args: [ 0.38 ]}), useRef())
  const [ head, api1 ] = useSphere(() => ({ ...param, args: [ 0.40 ]}), useRef())
  const [ earL, api2 ] = useSphere(() => ({ ...param, args: [ 0.15 ]}), useRef())
  const [ earR, api3 ] = useSphere(() => ({ ...param, args: [ 0.15 ]}), useRef())
  const [ tail, api4 ] = useSphere(() => ({ ...param, args: [ 0.13 ]}), useRef())
  const [ topL, api5 ] = useSphere(() => ({ ...param, args: [ 0.10 ]}), useRef())
  const [ topR, api6 ] = useSphere(() => ({ ...param, args: [ 0.10 ]}), useRef())
  const [ botL, api7 ] = useSphere(() => ({ ...param, args: [ 0.10 ]}), useRef())
  const [ botR, api8 ] = useSphere(() => ({ ...param, args: [ 0.10 ]}), useRef())
  const [ armL, api9 ] = useSphere(() => ({ ...param, args: [ 0.16 ]}), useRef())
  const [ armR, api10 ] = useSphere(() => ({ ...param, args: [ 0.16 ]}), useRef())
  const [ legL, api11 ] = useSphere(() => ({ ...param, args: [ 0.18 ]}), useRef())
  const [ legR, api12 ] = useSphere(() => ({ ...param, args: [ 0.18 ]}), useRef())

  const constaint = { axisA: [ 0, 1, 0 ], axisB: [ 0, 1, 0 ], angle: 0, twistAngle: Math.PI / 8, maxMultiplier: 1500 }

  useConeTwistConstraint( body, head, { pivotA: [ 0, 0.30, 0 ], pivotB: [ 0, -0.30, 0 ], ...constaint })
  useConeTwistConstraint( head, earL, { pivotA: [ 0.15, 0.13, 0 ], pivotB: [ -0.15, -0.13, 0 ], ...constaint })
  useConeTwistConstraint( head, earR, { pivotA: [ -0.15, 0.13, 0 ], pivotB: [ 0.15, -0.13, 0 ], ...constaint })
  useConeTwistConstraint( body, tail, { pivotA: [ 0, -0.13, -0.20 ], pivotB: [ 0, 0, 0.20 ], ...constaint })
  useConeTwistConstraint( body, topL, { pivotA: [ 0.10, 0.10, 0 ], pivotB: [ -0.10, 0, 0 ], ...constaint })
  useConeTwistConstraint( body, topR, { pivotA: [ -0.10, 0.10, 0 ], pivotB: [ 0.10, 0, 0 ], ...constaint })
  useConeTwistConstraint( body, botL, { pivotA: [ 0.15, -0.15, 0 ], pivotB: [ -0.15, 0, 0 ], ...constaint })
  useConeTwistConstraint( body, botR, { pivotA: [ -0.15, -0.15, 0 ], pivotB: [ 0.15, 0, 0 ], ...constaint })
  useConeTwistConstraint( topL, armL, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.4, 0 ], ...constaint })
  useConeTwistConstraint( topR, armR, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.4, 0 ], ...constaint })
  useConeTwistConstraint( botL, legL, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.5, 0 ], ...constaint })
  useConeTwistConstraint( botR, legR, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.5, 0 ], ...constaint })

  const apis = [ api, api1, api2, api3, api4, api5, api6, api7, api8, api9, api10, api11, api12 ]

  useEffect(() => {
    api.position.subscribe( position => setTarget( position ))
    api1.angularVelocity.set( 0, 0, 0 )
    api1.velocity.set( 0, 0, 0 )
    api1.rotation.set( 0, 0, 0 )
    apis.map( item => { item.position.set( -5, 2.3, 0 )})
    start ? api1.mass.set( 0.1 ): api1.mass.set( 0 )
    camera.position.set( -5, 3, 5 )
  }, [ start ])

  useEffect(() => { if( target[1] < -10 ) setStart( null )}, [ target ])

  useEffect(() => api.applyImpulse( impulse, [ 0, 0, 0 ]), [ impulse ])

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

export default Bear