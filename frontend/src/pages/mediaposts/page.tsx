import { useState, useEffect } from "react"
import AddPost from "./components/addPost";
import DeletePost from "./components/deletePost";
import UpdatePost from "./components/updatePost";
import ViewAll from "./components/viewAll";
import ViewArchived from "./components/viewArchived";
import ViewOne from "./components/viewOne";

export default function Mediaposts(){
    const [currentView, setCurrentView] = useState("addPost")
    // setCurrentView('viewOne')

    const condititionalRenderingComponents = () =>{
        let jsx
        switch (currentView) {
            case 'updatePost':
                return <UpdatePost/>
                break;

            case 'deletePost':
                return <DeletePost/>
                break;

            case 'viewOne':
                return <ViewOne/>
                break;

            case 'viewAll':
                return <ViewAll/>
                break;

            case 'viewArchived':
                return <ViewArchived/>
                break;
        
            default:
                return <AddPost/>
                break;
        }
    }

    useEffect(()=>{
    }, [currentView])

    return (
        <div className="flex flex-col gap-y-16 min-h-screen w-full bg-black font-sans">
            <div className="flex flex-row flex-wrap gap-3 p-6 bg-[#181818] items-center justify-center border-b border-[#202020]">
                <div onClick={()=>{window.location.href='/profile'}} className="bg-[#FFC000] text-black px-6 py-4 text-sm font-normal uppercase tracking-normal rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#917300]">
                    Profile
                </div>
                <div onClick={()=>{setCurrentView('addPost')}} className="bg-transparent text-white border border-white/50 px-4 py-4 text-[14.4px] font-light uppercase tracking-[0.2px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70">
                    Add Post
                </div>
                <div onClick={()=>{setCurrentView('updatePost')}} className="bg-transparent text-white border border-white/50 px-4 py-4 text-[14.4px] font-light uppercase tracking-[0.2px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70">
                    Update Post
                </div>
                <div onClick={()=>{setCurrentView('deletePost')}} className="bg-transparent text-white border border-white/50 px-4 py-4 text-[14.4px] font-light uppercase tracking-[0.2px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70">
                    Delete Post
                </div>
                <div onClick={()=>{setCurrentView('viewOne')}} className="bg-transparent text-white border border-white/50 px-4 py-4 text-[14.4px] font-light uppercase tracking-[0.2px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70">
                    View One
                </div>
                <div onClick={()=>{setCurrentView('viewAll')}} className="bg-transparent text-white border border-white/50 px-4 py-4 text-[14.4px] font-light uppercase tracking-[0.2px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70">
                    View All
                </div>
                <div onClick={()=>{setCurrentView('viewArchived')}} className="bg-transparent text-white border border-white/50 px-4 py-4 text-[14.4px] font-light uppercase tracking-[0.2px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#1EAEDB] hover:opacity-70">
                    View Archived
                </div>
                <div onClick={()=>{window.location.href='/logout'}} className="bg-[#969696] text-[#202020] px-4 py-4 text-[13px] font-light uppercase tracking-[0.13px] rounded-none cursor-pointer transition-colors duration-150 hover:bg-[#7D7D7D]">
                    Logout
                </div>
            </div>
            <div className="flex justify-center items-center px-6 pb-16">{condititionalRenderingComponents()}</div>
        </div>
    )
}