import { useZustand } from "@/lib/zustand"
import React from "react"

const Controls = () => {

  const { target, shoots, setShoots } = useZustand()

  const bg = ( url ) => `#FFF url(${ url }) no-repeat center center /100%`

  return (
    <div className="absolute top-0 w-full h-full flex justify-center items-center pointer-events-none">
      <div className="text-9xl text-black/30 select-none">{ Math.floor( target[1])}</div>
      <div className="absolute bottom-0 p-5 w-full flex justify-center items-center">
        <div className="max-w-[500px] rounded-3xl border-2 bg-white flex justify-between items-center pointer-events-auto">
          <div className="m-[2px] size-10 rounded-3xl border-2 hover:border-indigo-500" style={{ background: bg( shoots ? "/img/camera.png" :"/img/ball.png")}} onClick={ setShoots }/>
          <div className="m-[2px] px-2 h-10 rounded-3xl border-2 flex justify-center items-center">aiueo</div>
          <div className="m-[2px] size-10 rounded-3xl border-2 hover:border-indigo-500" style={{ background: bg("/img/google.png")}}/>
        </div> 
      </div>
    </div>
  )
}

export default Controls