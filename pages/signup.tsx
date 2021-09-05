import MyInputComponent from "../component/myInput.component";
import MyButtonComponent from "../component/myButton.component";
import {useEffect, useState} from "react";
import axios from "axios";
import Router from "next/router";
import {use} from "ast-types";
import Allpost from "./allpost";
import {useRecoilState, useRecoilValue} from "recoil";
import {userLogin} from "../component/UpperNavbar";

export default function Signup() {
    let userLog=useRecoilValue(userLogin)

    let token=localStorage.getItem("token")


    function checkLogedin(){
        if (token == null){

        }else{

        }
    }
    console.log(userLog)


    const url = "http://localhost:8000/user/";
    let username = "";
    let password = "";
    let checkPass;




    async function signup(username: string, password: string) {
        let result = await axios.post(url +"signup", {username, password})
    }

    async function login(username: string, password: string) {
        let result = await axios.post(url + "login", {username, password})
        console.log(result.data)
        console.log(result.data.token)

        checkPass=result.data.passwordTrue;
        if (checkPass){
             localStorage.setItem("token",result.data.token)
            await Router.push('/allpost')
        }else {
            alert("Your password Is Wrong Kardesss")
        }
    }


    useEffect(() => {
        checkLogedin()
    }, [])

    return (
        <div className='m-auto flex flex-col justify-center'>
            {userLog ? <>You are Already signed in</>: <>
                <MyInputComponent id={'username'} type={'text'} name={'Username: '}
                                  placeholder={'Please enter your username'}
                                  onChange={value => username = value}
                />
                <MyInputComponent id={'password'} type={'password'} name={'Password : '}
                                  placeholder={'Please enter your password'}
                                  onChange={value => password = value} />

                <div className="flex flex-row">
                    <MyButtonComponent name={'Sign Up'} n={() => signup(username, password)}/>
                    <MyButtonComponent name={'Login'} n={() => login(username, password)}/>
                </div>
            </>
            }
        </div>


    )
}


