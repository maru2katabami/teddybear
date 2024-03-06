import React, { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useBox, usePlane } from "@react-three/cannon"
import * as THREE from "three"
import { useZustand } from "@/lib/zustand"

const Plane = ({ args, position, rotation }) => {

  const [ ref, api ] = usePlane(() => ({ type: "Static", args: args, position: position, rotation: rotation }), useRef())

  return (
    <mesh ref={ ref }>
      <planeGeometry args={ args }/>
      <meshNormalMaterial transparent opacity={ 0.1 }/>
    </mesh>
  )
}

const Floor = ({ args, position }) => {

  const { target, shoots, setImpulse } = useZustand()

  const [ ref, api ] = useBox(() => ({ type: "Static", args: args, position: [ position[0], position[1] - 0.5, position[2]]}), useRef())

  const materialRef = useRef()

  const [ point, setPoint ] = useState( new THREE.Vector2( 0, 0 ))
  const [ radius, setRadius ] = useState( 0 )
  const [ press, setPress ] = useState( false )
  const [ delta, setDelta ] = useState( 0 )

  const handleDown = e => {
    if( Math.floor( target[1]) === position[1] && !shoots ) {
      setPress( true )
      setDelta( Date.now())
      setPoint( e.intersections[0].uv )
    }
  }

  const handleMove = e => {
    if( Math.floor( target[1]) === position[1] && !shoots && press ) {
      setPoint( e.intersections[0].uv )
    }
  }

  const handleUp = () => {
    if( Math.floor( target[1]) === position[1] && !shoots && press ) {
      setPress( false )
      const force = Math.min(( Date.now() - delta ) / 200, 20 )
      const distance = {
        x: (( target[0] - position[0]) / args[0] ) - ( point.x - 0.5 ),
        y: (( target[2] - position[2]) / args[0] ) - -( point.y - 0.5 )
      }
      setImpulse([ force * distance.x, force, force * distance.y ])
    }
  }

  useFrame(() => {
    if( press ) {
      const elapsedTime = ( Date.now() - delta ) / 4000
      setRadius( Math.min( elapsedTime, 1 ))
    } else {
      setRadius( 0 )
    }
  })

  const shaderProps = {
    uniforms: {
      uColorS: { value: new THREE.Color( 0xff0000 )},
      uColorE: { value: new THREE.Color( 0x0000ff )},
      uPoint: { value: point },
      uRadius: { value: radius }
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `,
    fragmentShader: `
    uniform vec3 uColorS;
    uniform vec3 uColorE;
    uniform vec2 uPoint;
    uniform float uRadius;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      float distance = distance( vUv, uPoint );
      float opacity = mix( 1.0, 0.0, smoothstep( 0.0, 1.0, distance / uRadius ));
      vec3 color = mix( uColorS, uColorE, smoothstep( 0.0, 1.0, distance / uRadius ));
      if( distance < uRadius ) {
        gl_FragColor = vec4( color, 1.0 );
      } else {
        gl_FragColor = vec4( vNormal, 1.0 );
      }
    }
    `
  }
  
  return(
    <mesh ref={ ref } onPointerDown={ handleDown } onPointerMove={ handleMove } onPointerUp={ handleUp }>
      <boxGeometry args={ args }/>
      <shaderMaterial ref={ materialRef } args={[ shaderProps ]} transparent/>
    </mesh>
  )
}

const WallandFloor = () => {

  const floor = []
  for( let i = 1; i < 200; i++ ) { floor.push({ id: i, position: [( i * 3 % 11 ) - 5, 6 * i, ( i * 7 % 11 ) - 5 ]})}

  return (
    <group>
      <Plane args={[ 20, 1000 ]} position={[ 0, 500, -10 ]} rotation={[ 0, 0, 0 ]}/>
      <Plane args={[ 20, 1000 ]} position={[ 0, 500, 10 ]} rotation={[ 0, Math.PI, 0 ]}/>
      <Plane args={[ 20, 1000 ]} position={[ -10, 500, 0 ]} rotation={[ 0, Math.PI/2, 0 ]}/>
      <Plane args={[ 20, 1000 ]} position={[ 10, 500, 0 ]} rotation={[ 0, -Math.PI/2, 0 ]}/>
      <Floor args={[ 20, 1, 20 ]} position={[ 0, 0, 0 ]}/>
      { floor.map(( item ) => (
      <Floor key={ item.id } args={[ 5, 1, 5 ]} position={ item.position }/>
      ))}
    </group>
  )
}

export default WallandFloor