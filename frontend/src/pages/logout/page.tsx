import axios from 'axios'
import toast from 'react-hot-toast'

export default function Logout(){
    const logoutFunc = ()=>{
        const resp = axios.get("/api/logout")
        toast.success('Logged out')
        console.log('logged out')
        window.location.href = '/login'
    }

    return(
        <div>
            <button onClick={logoutFunc} > Logout</button>
        </div>
    )
}