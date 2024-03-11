import React, { useEffect } from "react"

const AdBlock = () => {

  useEffect(() => {
  }, [])

  return (
    <div className="absolute top-0 w-full h-full flex justify-center items-center pointer-events-none">
      <ins
        className="adsbygoogle w-full h-full"
        style={{ display: "block" }}
        data-adtest={ process.env.NODE_ENV === "development" ? "on" : "off" }
        data-ad-client="ca-pub-7513541440780811"
        data-ad-slot="7363878258"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdBlock