import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useBox, useConeTwistConstraint, useSphere, useTrimesh } from "@react-three/cannon"

const Chair = () => {

  const { nodes } = useGLTF("/glb/swingchair.glb")

  const basketArgs = [ nodes.basket.geometry.attributes.position.array, nodes.basket.geometry.index.array ]

  const [ sphere ] = useSphere(() => ({ type: "Static", args: [ 0.1 ], position: [ 0, 102, 0 ]}), useRef())
  const [ basket ] = useTrimesh(() => ({ mass: 10, args: basketArgs, position: [ 0, 100, 0 ], rotation: [ 0, Math.PI, 0 ]}), useRef())
  const [ chainA ] = useBox(() => ({ mass: 2, args: [ 0.1, 0.42, 0.1 ], position: [ 0, 100, 0 ], rotation: [ 0, Math.PI, 0 ]}), useRef())
  const [ chainB ] = useBox(() => ({ mass: 2, args: [ 0.1, 0.42, 0.1 ], position: [ 0, 100, 0 ], rotation: [ 0, Math.PI, 0 ]}), useRef())
  const Constraint = { axisA: [ 0, 1, 0 ], axisB: [ 0, 1, 0 ], angle: 0, twistAngle: Math.PI / 8 }
  useConeTwistConstraint( sphere, chainA, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, 0.15, 0 ], ...Constraint })
  useConeTwistConstraint( chainA, chainB, { pivotA: [ 0, -0.15, 0 ], pivotB: [ 0, 0.2, 0 ], ...Constraint })
  useConeTwistConstraint( chainB, basket, { pivotA: [ 0, -0.15, 0 ], pivotB: [ 0, 1.8, 0 ], ...Constraint })
  
  return (
    <group>
      <mesh ref={ sphere }>
        <sphereGeometry args={[ 0.1 ]}/>
        <meshNormalMaterial/>
      </mesh>
      <primitive object={ nodes.basket } ref={ basket }/>
      <primitive object={ nodes.chainA } ref={ chainA }/>
      <primitive object={ nodes.chainB } ref={ chainB }/>
    </group>
  )
}

export default Chair
