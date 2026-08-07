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
        <div>
            <h2>
                Update Post
            </h2>
            <form className="flex flex-col items-center justify-center border-2 border-white p-4 bg-gray-600/40 rounded-xl" onSubmit={setPostData}>
                <div className="flex flex-row p-2">
                    <h3 className="text-b px-1 ">Post Title:</h3>
                    <input className="border-white/50 border-[1.5px] rounded-sm text-" placeholder="My Cat" name="title"/>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-sm px-25" type="submit"> Search </button>
            </form>
            <br/>
            <div className="flex flex-col items-center justify-center border-2 border-white p-4 bg-gray-600/40 rounded-xl">
                {(postFound)?
                    (
                        <>
                        <div className="flex flex-col">
                            <h2>
                                {postTitle}
                            </h2>
                            <div className="flex flex-row items-center justify-center">
                                <FaRegUserCircle />
                                <h3 className="p-1">@{postedBy}</h3>
                            </div>
                            <h3>
                                {postBody}
                            </h3>
                        </div>
                        </>
                    ):
                    (
                        <div>
                            <h3 className="p-8">
                                Post Not Found
                                </h3>
                        </div> 
                    )}
            </div>
            <br/>
            <div>
                {(postFound)?(
                    <form className="flex flex-col items-center justify-center border-2 border-white p-4 bg-gray-600/40 rounded-xl" onSubmit={setNewPostData}>
                        <div className="flex flex-row p-2">
                            <h3 className="text-b px-1 ">New Post Title:</h3>
                            <input className="border-white/50 border-[1.5px] rounded-sm text-" placeholder="My Cat" name="newTitle"/>
                        </div>
                        <div className="flex flex-row p-2">
                            <h3 className="text-b px-1 ">New Post Body:</h3>
                            <input className="border-white/50 border-[1.5px] rounded-sm text-" placeholder="My Cat" name="newBody"/>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white rounded-sm px-25" type="submit"> Update Post </button>
                    </form>
                ):(<></>)}
                
            </div>
            

        </div>
    )
}