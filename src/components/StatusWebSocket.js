import React,{useEffect} from 'react'
function StatusWebSocket({cableApp}) {
    useEffect(() => {
        cableApp.user = cableApp.cable.subscriptions.create({
            channel: 'AppearanceChannel',
            user: 1,      
        }, 
        {
            received: (updatedStatus) => {
                console.log("updatedStatus",updatedStatus);
            }
        })
    }, [])
    
  return (
    <div></div>
  )
}

export default StatusWebSocket