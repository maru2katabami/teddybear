import React, { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useBox } from "@react-three/cannon"
import * as THREE from "three"
import { useZustand } from "@/lib/zustand"

const Cube = ({ args, position }) => {

  const { target, shoots, setImpulse } = useZustand()

  const [ ref, api ] = useBox(() => ({
    type: "Static",
    args: args,
    position: [ position[0], position[1] - args[1] + 2.5, position[2]]
  }), useRef())

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

  const handleUp = e => {
    setPress( false )
    if( Math.floor( target[1]) === position[1] && !shoots && radius >= 0.1 && e.type === "pointerup") {
      const force = Math.min(( Date.now() - delta ) / 200, 20 )
      const distance = {
        x: (( target[0] - position[0]) / args[0]) - ( point.x - 0.5 ),
        y: (( target[2] - position[2]) / args[0]) - -( point.y - 0.5 )
      }
      setPoint( e.intersections[0].uv )
      setImpulse([ force * distance.x, force, force * distance.y ])
    }
  }

  useFrame(() => {
    if( press ) {
      const elapsedTime = ( Date.now() - delta ) / 4000
      setRadius( Math.min( elapsedTime, 1 ))
    } else {
      setRadius( Math.max( 0, radius - 0.02 ))
    }
  })

  const shaderProps = {
    uniforms: {
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
    uniform vec2 uPoint;
    uniform float uRadius;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      float distance = distance( vUv, uPoint );
      vec3 color = mix( vec3( 1.0, 0, 0 ), vNormal, smoothstep( 0.0, 1.0, distance / uRadius ));
      if( distance < uRadius ) { // && vNormal.y > 0.5 で上面のみ
        gl_FragColor = vec4( color, 1.0 );
      } else {
        gl_FragColor = vec4( vNormal, 1.0 );
      }
    }
    `
  }
  
  return(
    <mesh ref={ ref } onPointerDown={ handleDown } onPointerMove={ handleMove } onPointerUp={ handleUp } onPointerOut={ handleUp }>
      <boxGeometry args={ args }/>
      <shaderMaterial ref={ materialRef } args={[ shaderProps ]} transparent/>
    </mesh>
  )
}

const Floor = () => {

  const floor = [{ id: 0, args: [ 20, 5, 20 ], position: [ 0, 0, 0]}]

  for( let i = 1; i < 50; i++ ) {
    floor.push({
      id: i,
      args: [ 5, 5 - ( 5 * ( 0.02 * i )), 5 ],
      position: [
        ( Math.round( Math.sin( i ) * 5 ) + 5 ) % 11 - 5,
        5 * i,
        ( Math.round( Math.cos( i ) * 5 ) + 5 ) % 11 - 5 ]
    })
  }

  return (
    <group>
    { floor.map(( item ) => (
      <Cube key={ item.id } args={ item.args } position={ item.position }/>
    ))}
    </group>
  )
}

export default Floor