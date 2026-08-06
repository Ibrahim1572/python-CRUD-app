import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios'
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"



export default function ViewOne(){
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("")
    const [postedBy, setPostedBy] = useState("")
    const [postDate, setPostDate] = useState("")
    const [postFound, setPostFound] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)

    const setPostData = async(e:any) =>{
        e.preventDefault()

        toast.error("Post Not Found", {
            style: {
                background: "#202020",
                color: "#FFFFFF",
                borderRadius: "0px",
                border: "1px solid #FFC000",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "normal",
                fontFamily: "'LamboType', Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
            iconTheme: {
                primary: "#FFC000",
                secondary: "#000000",
            },
        })
        const form = new FormData(e.currentTarget)
        setPostTitle(form.get('title') as string)
        const data = await axios.post("/api/viewOne", {'postTitle':form.get('title') as string})
        setPostBody(data['data']['post'][0]['postBody']);
        setPostDate(data['data']['post'][0]['createdAt'])
        setPostedBy(data.data.post[0].userName)
        toast.success("Post Found", {
            style: {
                background: "#202020",
                color: "#FFFFFF",
                borderRadius: "0px",
                border: "1px solid #FFC000",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "normal",
                fontFamily: "'LamboType', Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
            iconTheme: {
                primary: "#FFC000",
                secondary: "#000000",
            },
        })       
        if(postTitle&&postBody&&postedBy&&postDate){
                setPostFound(true)
            }
        }

    useEffect(()=>{
    }, [postFound])

    const post = {'postTitle': 'post1', 'postBody':'this is body of demo post', 'postedBy':'user1'}

    return (
        <div className="w-full max-w-[560px] flex flex-col gap-y-12 font-sans">

            <h2 className="text-white text-[27px] leading-[1.37] font-normal uppercase m-0">
                View One Post
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
                    ):
                    (
                        <div>
                            <p className="text-[#7D7D7D] text-base font-normal py-8 m-0">
                                Post Not Found
                                </p>
                        </div> 
                    )}
            </div>
            

        </div>
    )
}