import React, {useState} from "react";
import 'tailwindcss/tailwind.css'
import Router from "next/router";


export default function PostView(props: { userName: string, text: string, date: string, id: string ,comment:number}) {
    let [comment, setComment] = useState(false);


    function show() {
        setComment(!comment);
        console.log(comment)
    }

    async function goToThePost() {
        //setId(props.id)
        await Router.push("/post/" + props.id)
    }

    return (
        <div
            className='flex flex-col m-auto p-6 max-w-2xl  border-4  border-black rounded-2xl bg-blue-100 inline-block mt-2'
            onClick={goToThePost}>
            <p className='2xl:bg-green-50 inset-0 text-2xl text-blue-800'>{props.userName}</p>
            <p className='ml-5 mr-5 h-auto mt-3 line-clamp-5 break-words text-xl '>{props.text}</p>
            <div className='flex justify-end inline-block'>
                <a className='ml-5 mr-5 hover:bg-indigo-500 rounded-2xl ' onClick={show}>
                    <svg viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'
                         className='fill-current text-black  h-12 w-12 inline-block'>
                        <path
                            d='M10,2.262c-3.486,0-6.322,2.837-6.322,6.322c0,2.129,1.105,4.126,2.905,5.291l0.009,3.396c0.002,0.168,0.093,0.326,0.24,0.406c0.072,0.041,0.149,0.061,0.228,0.061c0.086,0,0.171-0.023,0.246-0.07l6.338-3.922c0.037-0.021,0.069-0.049,0.098-0.08c1.618-1.193,2.581-3.084,2.581-5.082C16.322,5.099,13.485,2.262,10,2.262z M13.109,12.969c-0.016,0.01-0.03,0.023-0.044,0.037l-5.542,3.426l-0.006-2.594c0.012-0.027,0.023-0.057,0.03-0.086c0.05-0.203-0.041-0.414-0.221-0.52c-1.675-0.963-2.715-2.746-2.715-4.648c0-2.971,2.417-5.387,5.388-5.387c2.971,0,5.387,2.417,5.387,5.387C15.387,10.316,14.536,11.955,13.109,12.969z'/>
                    </svg>
                    <p className='inline-block text-xl text-black mr-1.5'>{props.comment}</p>
                </a>
            </div>
            <div className={` ${comment ? "visible" : "hidden"}`}>
                <input className='border-none bg-white p-3 m-1.5 w-80 break-words hover:shadow-md hover:bg-pink-400
                focus-within:bg-pink-400 duration-500 hover:scale-50 focus-within:outline-none rounded-2xl outline-none text-white'></input>
                <button className='border-none bg-gray-200 focus-within:outline-none sm:hover:bg-gray-400 hover:text-blue-50 p-3 ml-10 rounded-2xl mt-3.5
                hover:shadow-lg w-1/4 hover:-translate-y-1 duration-500'>Comment
                </button>
            </div>
            <p className='flex justify-end mt-2'>{props.date}</p>
        </div>
    )
}
