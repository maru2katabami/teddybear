import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useZustand } from "@/lib/zustand"

const Controls = () => {

  const { data } = useSession()

  const { start, setStart, target, shoots, setShoots } = useZustand()

  const bg = ( url ) => `#FFF url(${ url }) no-repeat center center / 100%`

  const formatTime = ( millisecond ) => {
    const seconds = Math.floor(( millisecond - start ) / 1000 )
    const hours = Math.floor( seconds / 3600 )
    const minutes = Math.floor(( seconds % 3600 ) / 60 )
    const secs = seconds % 60
    const formattedHours = hours < 10 ? `0${ hours }` : hours
    const formattedMinutes = minutes < 10 ? `0${ minutes }` : minutes
    const formattedSeconds = secs < 10 ? `0${ secs }` : secs
    return `${formattedHours} h ${ formattedMinutes } m ${ formattedSeconds } s`
  }

  const handleStart = () => setStart( start ? null: Date.now())

  const handleRec = () => {
  }

  return (
    <div className={`absolute top-0 w-full h-full flex justify-center items-center ${ start ? "pointer-events-none": "bg-white/40 pointer-events-auto"}`}>
      <div className={`text-7xl ${ start ? "text-black/40": "text-black"}`}>{ start ? Math.floor( target[1]): "Ready?"}</div>
      <div className="absolute bottom-0 p-5 w-full flex justify-center items-center">
        <div className="max-w-[500px] rounded-3xl border-2 bg-white flex justify-between items-center pointer-events-auto">
          { start ?
          <div className="m-[2px] size-10 rounded-3xl border-2" style={{ background: bg( shoots ? "/img/ball.png" :"/img/bounce.png")}} onClick={ setShoots }/>:
          <div className="m-[2px] size-10 rounded-3xl border-2" style={{ background: bg("/img/ranking.png")}}/>
          }
          <div className="m-[2px] px-2 w-24 h-10 rounded-3xl border-2 flex justify-center items-center text-xs" onClick={ handleStart }>{ start ? formatTime( Date.now()): "start"}</div>
          <div className="m-[2px] size-10 rounded-3xl border-2" style={{ background: bg( data ? data?.user.image: "/img/google.png")}} onClick={() => data ? signOut(): signIn()}/>
        </div> 
      </div>
    </div>
  )
}

export default Controls