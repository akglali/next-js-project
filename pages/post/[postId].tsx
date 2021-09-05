import Router, {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CommentComponent from "../../component/commentComponent/commetComponent";
import 'tailwindcss/tailwind.css'

export default function PostPage(){
    let router=useRouter();
    let postId=router.query.postId;
    let [comment, setComment] = useState(false);
    let url="http://localhost:8000/"
    let [textContent,setTextContent]=useState("");
    let [username,setUsername]=useState("");
    let [text,setText]=useState("")
    let [date,setDate]=useState("")
    let [comments, setComments] = useState<JSX.Element[]>([])
    let [commentCount,setCommentCount]=useState(0)
    let [reloadCommentsValue, setReloadValue]=useState(false);
    useEffect(() => {
        if(!postId)
            return
        getSinglePost();
    }, [postId])
    useEffect(()=>{if(postId)getAllComment()}, [reloadCommentsValue, postId]);
    function show() {
        console.log(comment)
        setComment(!comment);
    }
    if(!postId)
        return <p>loading</p>
    async function getAllComment(){
        let result= await axios.get(url+"comment/"+postId)
        let resultData=result.data
        for (let i in resultData){
            let dateYear = new Date(resultData[i].DateCreated).toLocaleDateString()
            let dateTime = new Date(resultData[i].DateCreated).toLocaleTimeString()
            let aComment= <CommentComponent username={resultData[i].VirtualName} text={resultData[i].Textcontent} date={dateYear+" "+dateTime}/>
            comments.push(aComment)
            setComments([...comments])
        }
        console.log(result.data)
    }

    let token =  localStorage.getItem("token");

    async  function addComment(textcontent:string){
        let result= await axios.post(url+"comment/postcomment",
            {
                postid:postId,
                textcontent
            },{
                headers:{
                    'Token': `${token}`
                }
            });
        console.log(result.data)
        setComment(false);
        setComments([])
        setReloadValue(!reloadCommentsValue)
    }


    async function getSinglePost(){
        let result=await axios.get(url+"post/"+postId)
        let resultData=result.data
        let dateYear = new Date(resultData.DateCreated).toLocaleDateString()
        let dateTime = new Date(resultData.DateCreated).toLocaleTimeString()
        setUsername(resultData.VirtualName)
        setText(resultData.TextContent)
        setDate(dateYear + " " + dateTime)
        setCommentCount(resultData.CommentCount)
    }

    return (

        <div className='flex flex-col m-auto p-6 max-w-2xl  border-4  border-black rounded-2xl bg-blue-100 inline-block mt-2' >
            <p className='2xl:bg-green-50 inset-0 text-2xl text-blue-800'>{username}</p>
            <p className='ml-5 mr-5 h-auto mt-3 line-clamp-5 break-words text-xl '>{text}</p>
            <div className='flex justify-end'>
                <a className='ml-5 mr-5 hover:bg-indigo-500 rounded-2xl  ' onClick={show}>
                    <svg viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'
                         className='fill-current text-black h-12 w-12 inline-block'>
                        <path
                            d='M10,2.262c-3.486,0-6.322,2.837-6.322,6.322c0,2.129,1.105,4.126,2.905,5.291l0.009,3.396c0.002,0.168,0.093,0.326,0.24,0.406c0.072,0.041,0.149,0.061,0.228,0.061c0.086,0,0.171-0.023,0.246-0.07l6.338-3.922c0.037-0.021,0.069-0.049,0.098-0.08c1.618-1.193,2.581-3.084,2.581-5.082C16.322,5.099,13.485,2.262,10,2.262z M13.109,12.969c-0.016,0.01-0.03,0.023-0.044,0.037l-5.542,3.426l-0.006-2.594c0.012-0.027,0.023-0.057,0.03-0.086c0.05-0.203-0.041-0.414-0.221-0.52c-1.675-0.963-2.715-2.746-2.715-4.648c0-2.971,2.417-5.387,5.388-5.387c2.971,0,5.387,2.417,5.387,5.387C15.387,10.316,14.536,11.955,13.109,12.969z'/>
                    </svg>
                    <p className='inline-block text-xl text-black mr-1.5'>{commentCount}</p>

                </a>
            </div>
            {comment && <div>
                <input className='border-none bg-white p-3 m-1.5 w-80 break-words hover:shadow-md hover:bg-pink-400
                focus-within:bg-pink-400 duration-500 hover:scale-50 focus-within:outline-none rounded-2xl outline-none text-white'
                       onChange={e => setTextContent(e.target.value)} required></input>
                <button className='border-none bg-gray-200 focus-within:outline-none sm:hover:bg-gray-400 hover:text-blue-50 p-3 ml-10 rounded-2xl mt-3.5
                hover:shadow-lg w-1/4 hover:-translate-y-1 duration-500' onClick={()=>addComment(textContent)} >Comment
                </button>
            </div>}
            <p className='flex justify-end mt-2 '>{date}</p>
            <>{comments}</>


        </div>
    )
}