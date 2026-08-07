import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios'
import { FaRegUserCircle } from "react-icons/fa";


export default function UpdatePost(){
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("")
    const [postedBy, setPostedBy] = useState("")
    const [postDate, setPostDate] = useState("")
    const [postFound, setPostFound] = useState(false)
    

    const setPostData = async(e:any) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        setPostTitle(form.get('title') as string)
        const data = await axios.post("/api/viewOne", {'postTitle':form.get('title') as string})
        setPostFound(true)
        setPostBody(data['data']['post'][0]['postBody']);
        setPostDate(data['data']['post'][0]['createdAt'])
        setPostedBy(data.data.post[0].userName)
        
    }
    const setNewPostData = async(e:any) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const title = form.get('newTitle') as string || ""
        const body = form.get('newBody') as string || ""
        console.log(`title: ${title}\nbody: ${body}`)
        const response = await axios.patch('/api/updatePost', {'newPostData':{'postTitle':title, 'postBody':body}, 'oldPostData':{'postTitle':postTitle}})
    }

    useEffect(()=>{
    }, [postFound])

    const post = {'postTitle': 'post1', 'postBody':'this is body of demo post', 'postedBy':'user1'}

    return (
        <div className="w-full max-w-[560px] flex flex-col gap-y-12 font-sans">

            <h2 className="text-white text-[27px] leading-[1.37] font-normal uppercase m-0">
                Update Post
            </h2>

            <form
                className="flex flex-col gap-6 bg-[#202020] border-b border-[#202020] p-10 rounded-none"
                onSubmit={setPostData}
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="title"
                        className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]"
                    >
                        Post Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        placeholder="My Cat"
                        className="bg-black border border-[#494949] rounded-none text-white text-base font-normal px-4 py-4 outline-none placeholder:text-[#7D7D7D]"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FFC000] text-black rounded-none py-6 text-base font-normal uppercase tracking-normal cursor-pointer transition-colors duration-150 hover:bg-[#917300]"
                >
                    Search
                </button>
            </form>

            <div className="flex flex-col items-center justify-center bg-[#202020] border-b border-[#202020] p-10 rounded-none">
                {(postFound)?
                    (
                        <>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h2 className="text-white text-2xl font-normal m-0">
                                {postTitle}
                            </h2>
                            <div className="flex flex-row items-center gap-2 text-[#7D7D7D]">
                                <FaRegUserCircle />
                                <span className="text-sm font-normal">@{postedBy}</span>
                            </div>
                            <p className="text-[#F5F5F5] text-base font-normal leading-relaxed m-0">
                                {postBody}
                            </p>
                        </div>
                        </>
                    ):
                    (
                        <div>
                            <p className="text-[#7D7D7D] text-base font-normal py-8 m-0">
                                Post Not Found
                                </p>
                        </div> 
                    )}
            </div>
            <div>
                {(postFound)?(
                    <form
                        className="flex flex-col gap-6 bg-[#202020] border-b border-[#202020] p-10 rounded-none"
                        onSubmit={setNewPostData}
                    >
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="newTitle"
                                className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]"
                            >
                                New Post Title
                            </label>
                            <input
                                id="newTitle"
                                name="newTitle"
                                placeholder="My Cat"
                                className="bg-black border border-[#494949] rounded-none text-white text-base font-normal px-4 py-4 outline-none placeholder:text-[#7D7D7D]"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="newBody"
                                className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]"
                            >
                                New Post Body
                            </label>
                            <input
                                id="newBody"
                                name="newBody"
                                placeholder="My Cat"
                                className="bg-black border border-[#494949] rounded-none text-white text-base font-normal px-4 py-4 outline-none placeholder:text-[#7D7D7D]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FFC000] text-black rounded-none py-6 text-base font-normal uppercase tracking-normal cursor-pointer transition-colors duration-150 hover:bg-[#917300]"
                        >
                            Update Post
                        </button>
                    </form>
                ):(<></>)}
                
            </div>
            

        </div>
    )
}