import axios from "axios"
import { useEffect } from "react"

export default function ViewAll(){
    const getPosts = async() =>{
        return await axios.get('/api/viewAll')
    }
    useEffect(()=>{
        const data = getPosts()
        console.log(data)
    },[])
    return(
        <div>this is viewAll page</div>
    ) 
}