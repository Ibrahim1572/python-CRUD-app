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
    const goToLogout = () =>{
        window.location.href = "/logout"
    }

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-10 font-sans">
            <div className="w-full max-w-[440px] bg-[#202020] rounded-none p-10 md:p-14 border-b border-[#202020]">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-white text-[40px] leading-[1.15] font-normal uppercase m-0">
                        Profile
                    </h1>
                    <p className="mt-3 text-[#7D7D7D] text-base leading-relaxed font-normal">
                        View your account details
                    </p>
                </div>

                {/* Fetch button */}
                <button
                    onClick={getProfile}
                    className="w-full bg-[#FFC000] text-black rounded-none py-6 text-base font-normal uppercase tracking-normal cursor-pointer transition-colors duration-150 hover:bg-[#917300]"
                >
                    Get Data
                </button>

                {/* Profile data / empty state */}
                <div className="mt-8">
                    {username ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]">
                                    Username
                                </span>
                                <span className="text-[#F5F5F5] text-base font-normal border border-[#494949] px-4 py-4">
                                    {username}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]">
                                    Email
                                </span>
                                <span className="text-[#F5F5F5] text-base font-normal border border-[#494949] px-4 py-4">
                                    {email}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]">
                                    Role
                                </span>
                                <span className="text-[#F5F5F5] text-base font-normal border border-[#494949] px-4 py-4">
                                    {role}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-[#7D7D7D] text-base font-normal">
                            No profile data to show
                        </p>
                    )}
                </div>

                {/* Logout */}
                <button
                    onClick={goToLogout}
                    className="w-full mt-8 bg-transparent text-white border border-white/50 rounded-none py-4 text-[14.4px] font-light uppercase tracking-[0.2px] cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70"
                >
                    Logout
                </button>
                <br/>
                <button
                    onClick={()=>{window.location.href = '/mediaposts'}}
                    className="w-full mt-8 bg-transparent text-white border border-white/50 rounded-none py-4 text-[14.4px] font-light uppercase tracking-[0.2px] cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70"
                >
                    MediaPosts Page
                </button>

            </div>
        </div>
    )
}