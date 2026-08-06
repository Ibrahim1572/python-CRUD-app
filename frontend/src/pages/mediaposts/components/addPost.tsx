import axios from 'axios'
import toast from 'react-hot-toast'
export default function AddPost(){
    const setPostData = async(e:any) =>{

        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const title = form.get('title') as string
        const body = form.get('body') as string

        const data = {
            'postTitle':title,
            'postBody':body
        }

        const response = await axios.post("/api/addPost", {'postData':data})

        if(response.status===200){
            toast.success('Post Added')
        }
        else{
            toast.error('Post Not Added')
        }

    }

    return (
        <div className="w-full max-w-[560px] flex flex-col gap-y-12 font-sans">

            <h2 className="text-white text-[27px] leading-[1.37] font-normal uppercase m-0">
                Add a Post
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
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="body"
                        className="text-white text-xs font-medium uppercase tracking-[0.96px] leading-[1.83]"
                    >
                        Post Body
                    </label>
                    <input
                        id="body"
                        name="body"
                        placeholder="This is my cat bob..."
                        className="bg-black border border-[#494949] rounded-none text-white text-base font-normal px-4 py-4 outline-none placeholder:text-[#7D7D7D]"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FFC000] text-black rounded-none py-6 text-base font-normal uppercase tracking-normal cursor-pointer transition-colors duration-150 hover:bg-[#917300]"
                >
                    Add Post
                </button>
            </form>
        </div>
    )
}