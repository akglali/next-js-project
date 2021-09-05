import PostView from "../component/PostView";
import 'tailwindcss/tailwind.css'
import UpperNavbar from "../component/UpperNavbar";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Router from "next/router";
import PostComponent from "../component/PostComponent";
import MyButtonComponent from "../component/myButton.component";

export default function Allpost() {

    if(localStorage.getItem("token") == null){
        Router.push('/')
    }
    let token =  localStorage.getItem("token");

    let [post, setPost] = useState(false);
    function show() {
        setPost(!post);
        console.log(post)
    }

    let textContent="";

    let url = "http://localhost:8000/post/";

    async function sendPost(textcontent:string){
        let result= await axios.post(url +"sendpost" ,{
            textcontent
        },{
            headers:{
                'Token': `${token}`
            }
        });
        setPosts([]);
        setEffect(!effect)
    }



    let [posts, setPosts] = useState<JSX.Element[]>([])

    async function getAllPost() {
        let result = await axios.get(url+"getallpost")
        let resultData = result.data
        for (let i in resultData) {
            let dateYear = new Date(resultData[i].DateCreated).toLocaleDateString()
            let dateTime = new Date(resultData[i].DateCreated).toLocaleTimeString()
            let aPost = <PostView key={resultData[i].PostId} userName={resultData[i].VirtualName}
                                  text={resultData[i].TextContent} date={dateYear + " " + dateTime} id={resultData[i].PostId} comment={resultData[i].CommentCount}/>
            posts.push(aPost)
            setPosts([...posts])
            setPost(false)
        }
    }
    let [effect, setEffect]=useState(false);
    useEffect(() => {
        getAllPost()
    }, [effect])

    return (
        <div>
            {!post &&<>{posts}</>}
                <a className='ml-5 mr-5 hover:bg-indigo-500 rounded-2xl fixed bottom-0 right-0 mr-10 mb-10 ' onClick={show}>
                    <svg viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'
                         className='flex justify-end  fill-current text-black  h-16 w-16 '>
                        <path
                            d='M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z'/>
                    </svg>
                </a>
            {post &&
            <div className='flex h-screen flex-col justify-center '>
                <div className='m-auto flex flex-col justify-center'>
                    <PostComponent  id={'textcontent'} name={'Let me post For you buddy?'} placeholder={"Type something"}
                                    onChange={value => textContent = value}/>
                    <MyButtonComponent n={() => sendPost(textContent)} name={'POST'} />
                </div>
            </div>}
        </div>

    )
}