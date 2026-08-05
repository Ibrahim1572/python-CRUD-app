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

        const response = await axios.post("/api/addPost", data)

        if(response.status===200){
            toast.success('Post Added')
        }
        else{
            toast.error('Post Not Added')
        }

    }

    return (
        <div>
            <h2>
                Add a Post
            </h2>
            <form className="flex flex-col items-center justify-center border-2 border-white p-4 bg-gray-600/40 rounded-xl" onSubmit={setPostData}>
                <div className="flex flex-row p-2">
                    <h3 className="text-b px-1 ">Post Title:</h3>
                    <input className="border-white/50 border-[1.5px] rounded-sm text-" placeholder="My Cat" name="title"/>
                </div>
                <div className="flex flex-row p-2">
                    <h3 className="text-b px-1 ">Post Body:</h3>
                    <input className="border-white/50 border-[1.5px] rounded-sm" placeholder="This is my cat bob..." name="body"/>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-sm px-25" type="submit"> Add Post </button>
            </form>
        </div>
    )
}