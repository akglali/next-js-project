import React from "react";

export default function CommentComponent(props: { username:string,text:string,date:string }){
    return(
        <>
            <p className='2xl:bg-green-50 inset-0 text-xl text-red-400 justify-end flex mt-4'>{props.username}</p>
            <p className="flex justify-end ml-5 mr-5  mt-3  break-words text-xl">{props.text}</p>
            <p className='flex ml-5 mt-2'>{props.date}</p>
        </>
    )
}