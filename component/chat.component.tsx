import React from "react";
import MyInputComponent from "./myInput.component";

export default function ChatComponent(props: { array: JSX.Element[] }) {
    return (
        <>
            <div className='m-auto justify-center'>{props.array}</div>
        </>
    )
}