import React, { useMemo } from "react"
import { useSpring, a } from "@react-spring/three"

const PointLights = () => {
  
  const random = useMemo(() => {
    const points = []
    for (let i = 0; i < 10; i++ ) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos( 2 * Math.random() - 1 )
      const x = 10 * Math.sin( phi ) * Math.cos( theta )
      const y = 10 * Math.sin( phi ) * Math.sin( theta )
      const z = 10 * Math.cos( phi )
      const color = `#${ Math.floor( Math.random() * 16777215 ).toString( 16 ).padStart( 6, "0")}`
      points.push({ position: [ x, y, z ], color: color })
    }
    return points
  }, [])

  const { rotation } = useSpring({
    loop: true,
    to: async ( next ) => {
      while ( true ) {
        await next({
          rotation: [ 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random()],
        })
      }
    },
    from: { rotation: [ 0, 0, 0 ]},
    config: { mass: 5, tension: 50, friction: 50 },
  })

  return ( 
    <a.group rotation={ rotation }>
      { random.map(( p, index ) => (
        <pointLight key={ index } position={ p.position } intensity={ 100 } color={ p.color }/>
      ))}
    </a.group>
  )
}

export default PointLights