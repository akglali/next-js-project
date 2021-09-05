import 'tailwindcss/tailwind.css'
import React, {useEffect, useState} from "react";
import ChatComponent from "../component/chat.component";
import MyButtonComponent from "../component/myButton.component";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import UpperNavbar from "../component/UpperNavbar";
import ChatInputComponent from "../component/ChatInputComponent";
import Router from "next/router";

const client=new W3CWebSocket("ws://localhost:8000/ws")
export default function Chat() {
    if(localStorage.getItem("token") == null){
        Router.push('/')
    }
    client.onopen=()=>{
        console.log("Wb is connected")
    }


    let [array, setArray] = useState<JSX.Element[]>([]);
    const url = "http://localhost:8000/";
    const [username, setUsername] = useState<string | null>();
    let [sendText, sendTextState] = useState('');

    async function send(sendText: string ) {
        //let result = await axios.get(url + "send/" + sendText)
        sendTextState('')

        client.send(sendText)
    }

    async function chatPage() {
            //let result = await axios.get(url + 'rec',)
            client.onmessage = (message) => {
                console.log("This is from ws",message.data);
                let newElement = <div className='pt-5 flow-root' key={array.length}>
                    <p className='bg-gray-200 float-right  rounded-2xl bg-auto
                bg-no-repeat bg-center  italic font-mono text-xl'> {message.data}</p>
                </div>
                array.push(newElement)
                setArray([...array])
                console.log(array.length)
            };

    }

    useEffect(() => {
        console.log(window.localStorage.getItem("username"));
        chatPage();
        setUsername(window.localStorage.getItem("username"));
    }, [])
    return (
        <>
            <div className='flex h-screen flex-col justify-center'>


                <div
                    className='m-auto  text-left border-4 h-96 w-96 overflow-auto overflow-y-auto overflow-x-auto
                scrollbar-hide hover:shadow-lg p-3 border-black rounded-2xl bg-blue-100 '>
                    <ChatComponent array={array}></ChatComponent>
                </div>
                <div className='m-auto flex flex-row '>

                    <ChatInputComponent name={''} id={"whatever"} type={"text"} placeholder={"place enter your text"}
                                      onChange={value => sendTextState(value)} value={sendText}/>
                    <MyButtonComponent  name={'Send'} n={() => send(sendText)}/>
                </div>
            </div>
        </>


    )
}