import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useBox, useConeTwistConstraint, usePlane, useTrimesh } from "@react-three/cannon"

const SwingChair = () => {

  const { nodes } = useGLTF("/glb/swingchair.glb")

  const frameArgs = [ nodes.frame.geometry.attributes.position.array, nodes.frame.geometry.index.array ]
  const basketArgs = [ nodes.basket.geometry.attributes.position.array, nodes.basket.geometry.index.array ]

  const [ floor ] = usePlane(() => ({ type: "Static", args: [ 100, 100 ], rotation: [ -Math.PI / 2, 0, 0 ]}), useRef())
  const [ frame ] = useTrimesh(() => ({ type: "Static", args: frameArgs, position: [ 0, 0, 0 ]}), useRef())
  const [ basket ] = useTrimesh(() => ({ mass: 10, args: basketArgs, position: [ 0, 2.5, 0 ]}), useRef())
  const [ chainA ] = useBox(() => ({ mass: 2, args: [ 0.1, 0.42, 0.1 ], position: [ 0, 4.8, 0 ]}), useRef())
  const [ chainB ] = useBox(() => ({ mass: 2, args: [ 0.1, 0.42, 0.1 ], position: [ 0, 4.7, 0 ]}), useRef())
  const Constraint = { axisA: [ 0, 1, 0 ], axisB: [ 0, 1, 0 ], angle: 0, twistAngle: Math.PI / 8 }
  useConeTwistConstraint( frame, chainA, { pivotA: [ 0, 4.9, 0.33 ], pivotB: [ 0, 0.15, 0 ], ...Constraint })
  useConeTwistConstraint( chainA, chainB, { pivotA: [ 0, -0.15, 0 ], pivotB: [ 0, 0.2, 0 ], ...Constraint })
  useConeTwistConstraint( chainB, basket, { pivotA: [ 0, -0.15, 0 ], pivotB: [ 0, 1.8, 0 ], ...Constraint })
  
  return (
    <group>
      <mesh ref={ floor }/>
      <primitive object={ nodes.frame } ref={ frame }/>
      <primitive object={ nodes.basket } ref={ basket }/>
      <primitive object={ nodes.chainA } ref={ chainA }/>
      <primitive object={ nodes.chainB } ref={ chainB }/>
    </group>
  )
}

export default SwingChair
