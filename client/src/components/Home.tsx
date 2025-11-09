import { Cursor } from './Cursor'
import useWebSocket from 'react-use-websocket';
import { useEffect, useRef } from 'react';
import throttle from "lodash.throttle"

interface User {
  username: string
  state: {
    x: number
    y: number
  }
}

interface Users {
  [uuid: string]: User
}

interface HomeProps {
  username: string
}

const renderCursors = (users: Users) => {
  return Object
    .keys(users)
    .map(uuid => {
      const user = users[uuid]
      if (!user.state || typeof user.state.x !== 'number' || typeof user.state.y !== 'number') {
        return null
      }
      return <Cursor 
        key={uuid} 
        userId={uuid} 
        point={[ user.state.x, user.state.y ]} />
    })
}

const renderUsersList = (users: Users) => {
  return (
    <ul>
      {Object.keys(users).map(uuid => {
        return <li key={uuid}>{JSON.stringify(users[uuid])}</li>
      })}
    </ul>
  )
}

export function Home({ username }: HomeProps) {
  const WS_URL = `ws://127.0.0.1:8000`
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username }
  })

  const THROTTLE = 50
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

  useEffect(() => {
    sendJsonMessage({
      x: 0, y: 0
    })
    
    const handleMouseMove = (e: MouseEvent) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [sendJsonMessage])

  if (!lastJsonMessage) {
    return <div>Connecting...</div>
  }

  const users = lastJsonMessage as Users

  return <>
    {renderUsersList(users)}
    {/* ideally batch updates */}
    {renderCursors(users)}
  </>
}