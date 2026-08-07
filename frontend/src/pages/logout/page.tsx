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
        <div className="font-sans flex flex-col justify-center justify-items-center items-center p-8">
            <button
                onClick={logoutFunc}
                className="px-32 bg-transparent text-white border border-white/50 rounded-none py-4 text-[14.4px] font-light uppercase tracking-[0.2px] cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70"
            >
                Logout
            </button>
            <br/>
            <button
                onClick={()=>{window.location.href = '/mediaposts'}}
                className="px-25 bg-transparent text-white border border-white/50 rounded-none py-4 text-[14.4px] font-light uppercase tracking-[0.2px] cursor-pointer transition-colors duration-150 hover:bg-[#FFC000] hover:opacity-70"
            >
                Mediaposts Page
            </button>
        </div>
    )
}