import React,{useEffect,useCallback,useState} from 'react'
import {useSocket} from '../../util/socketContext'
import ReactPlayer from 'react-player'
import peer from '../../util/peer'

const Room = () => {
    const [friendId,setFriendId]=useState(null)
    const [myStream,setMyStream]=useState(null)
    const [friendStream,setFriendStream]=useState(null)
    const [accepted,setAccepted]=useState(false)
    const [myName,setMyName]=useState('')
    const [friendName,setFriendName]=useState('')
    const [friendEmail,setFriendEmail]=useState('')
    const socket=useSocket()

    const getFriendName=useCallback(async()=>{
      fetch(`http://localhost:4000/user/${friendEmail}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
          if (data.error) {
            console.error(data.error);
          } else {
            setFriendName(data.name);
          }
          })
          .catch(error => console.error('Error fetching user by email:', error));
    },[friendEmail,setFriendName])
    
    const userJoined=useCallback((data)=>{   //alerts everyone if a user has entered
        console.log(`${data.email} has joined with id ${data.id}`)
        setFriendId(data.id)
        setFriendEmail(data.email)
        getFriendName()
    },[setFriendId,setFriendEmail])

    const callUser=useCallback(async()=>{  
      const offer=await peer.getOffer()
      socket.emit('call_user',{sendTo:friendId,offer})
    },[socket,friendId])

    const myVideo=useCallback(async()=>{ //turn on my video
        const stream= await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setMyStream(stream)
    },[setMyStream])


    useEffect(()=>{
      setMyName(JSON.parse(localStorage.getItem('myName')))
    },[setMyName])

    useEffect(()=>{
      myVideo()
    },[myVideo])

    const incomingCall=useCallback(async({receivedFrom,offer})=>{
      setFriendId(receivedFrom)
      // console.log('Incoming Call :', receivedFrom,offer)
      const ans=await peer.getAnswer(offer)
      socket.emit('call_accepted',{sendTo:receivedFrom,ans})
      setAccepted(true)
    },[socket,setAccepted])

    const sendStream= useCallback(() => {
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    }, [myStream]);

    const callAccepted=useCallback(async({receivedFrom,ans})=>{
      // console.log('call accepted ', ans)
      peer.setLocalDescription(ans)
      setAccepted(true)
      sendStream()
    },[setAccepted,sendStream])

    const negotiationNeeded = useCallback(async () => {
      const offer = await peer.getOffer()
      socket.emit('negotiation_needed', { offer, sendTo: friendId })
    }, [friendId, socket])

    useEffect(() => {
      peer.peer.addEventListener('negotiationneeded',negotiationNeeded)
      return () => {
        peer.peer.removeEventListener('negotiationneeded',negotiationNeeded)
      }
    },[negotiationNeeded])

    const incomingNegotiation= useCallback(async ({receivedFrom, offer }) => {
        const ans = await peer.getAnswer(offer)
        socket.emit('negotiation_done',{sendTo:receivedFrom, ans })
        console.log('neg done',ans)
    },[socket])

    const negotiationComplete= useCallback(async ({receivedFrom,ans}) => {
      await peer.setLocalDescription(ans)
      console.log('neg complete',ans)
    }, [])

    useEffect(()=>{
      peer.peer.addEventListener('track',async(ev)=>{
        const stream=ev.streams
        console.log(ev)
        setFriendStream(stream[0])
      })
    },[])

    useEffect(()=>{
        socket.on('user_joined',userJoined)
        socket.on('call_incoming',incomingCall)
        socket.on('call_accepted',callAccepted)
        socket.on('negotiation_needed',incomingNegotiation)
        socket.on('negotiation_complete',negotiationComplete)
        return()=>{
            socket.off('user_joined',userJoined)
            socket.off('call_incoming',incomingCall)
            socket.off('call_accepted',callAccepted)
            socket.off('negotiation_needed',incomingNegotiation)
            socket.off('negotiation_complete',negotiationComplete)
        }
    },[socket,userJoined,incomingCall,callAccepted,incomingNegotiation,negotiationComplete])
  
    return (
      <div className='bg-yellow h-screen flex flex-col justify-evenly'>
        <div className='flex justify-evenly items-center'>
          <div className='bg-red p-7 shadow-lg rounded-md h-60'>
            {/* {myName} */}
            <ReactPlayer playing width='200px' height='200px' url={myStream}/>
          </div>
          {friendStream && <div className='bg-blue p-7 shadow-lg rounded-md h-60'>
            {/* {friendName} */}
            <ReactPlayer playing width='200px' height='200px' url={friendStream}/>
          </div>}
        </div>
        <div className='flex justify-center'>
          {friendId && <button className='border-2 border-indigo-700 w-12 text-white mt-3 py-1 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold'
            onClick={callUser}>Start Call</button>}
        </div>
      </div>)
}

export default Room
