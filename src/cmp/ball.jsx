import React, { useEffect, useRef } from "react"
import { useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import * as THREE from "three"

const Ball = ({ x, y }) => {

  const { camera } = useThree()
  const normalizedMouse = { x: ( x / window.innerWidth ) * 2 - 1, y: -( y / window.innerHeight ) * 2 + 1 }
  const mouse3D = new THREE.Vector3( normalizedMouse.x, normalizedMouse.y, 0.5 )
  mouse3D.unproject( camera )
  const direction = mouse3D.sub( camera.position ).normalize()
  const [ ref, api ] = useSphere(() => ({ mass: 1, args: [ 0.5 ], position: [ camera.position.x, camera.position.y, camera.position.z ]}), useRef())
  
  useEffect(() => {
    const impulse = direction.clone().multiplyScalar( 300 )
    api.applyImpulse([ impulse.x / 10, impulse.y / 10, impulse.z / 10 ], [ 0, 0, 0 ])
  }, [])

  return(
    <mesh ref={ ref }>
      <sphereGeometry args={[ 0.5, 64, 64 ]}/>
      <meshStandardMaterial color={ 0xFF6600 }/>
    </mesh>
  )
}

export default Ball