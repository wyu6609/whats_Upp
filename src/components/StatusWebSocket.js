import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {setValue} from '../redux/user'
import { useLocation } from "react-router-dom";
function StatusWebSocket({cableApp}) {
    const currentUser = useSelector(state=> state.user.value);
    const dispatch = useDispatch();
    const updateApp = (updatedStatus) => {
        // dispatch(setValue({
        //   updatedStatus
        // }))
      }
    useEffect(() => {
        cableApp.room = cableApp.cable.subscriptions.create({
            channel: 'appearance_channel',      
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