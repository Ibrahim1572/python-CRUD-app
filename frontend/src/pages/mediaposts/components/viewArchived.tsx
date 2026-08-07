import axios from "axios"
import { useEffect, useState } from "react"
import { FaRegUserCircle } from "react-icons/fa";


export default function ViewArchived(){
    
    const [posts, setPosts] = useState([])

    const getPosts = async() =>{
        const data =  await axios.get('/api/viewAll?isDeleted=true', {params:{isDeleted:'True'}})

        setPosts(data['data']['posts'])

    }
    useEffect(()=>{
        getPosts()
    },[])

    return(
        <div className="w-full max-w-[1100px] flex flex-col gap-y-12 font-sans">

            <h2 className="text-white text-[27px] leading-[1.37] font-normal uppercase text-center m-0">
                View Archived Posts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post:any, index)=>(
                    <div
                        key={index}
                        className="flex flex-col gap-3 bg-[#202020] border-b border-[#202020] p-8 rounded-none"
                    >
                        <h3 className="text-white text-xl font-normal m-0">
                            {post?.postTitle}
                        </h3>
                        <div className="flex flex-row items-center gap-2 text-[#7D7D7D] items-center justify-center">
                            <FaRegUserCircle />
                            <span className="text-sm font-normal">@{post?.userName}</span>
                        </div>
                        <p className="text-[#F5F5F5] text-base font-normal leading-relaxed m-0">
                            {post?.postBody}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    ) 
}