import axios from 'axios'
import { useState } from 'react'

export default function Profile(){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const getProfile = async() =>{
        const response = await axios.get('/api/profile')
        setUsername(response.data.userName)
        setEmail(response.data.email)
        setRole(response.data.role)
        console.log(`data: ${response.data}`)
    }

    return (
        <div>
            
            <button onClick={getProfile} >GetData</button>
            <h1>{username ? (
                <div>
                    <h1>Username: {username}</h1>
                    <h1>Email: {email}</h1>
                    <h1>Role: {role}</h1>
                </div>
            ):(<>no profile data to show</>)}</h1>
        </div>
    )
}