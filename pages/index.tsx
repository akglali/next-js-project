import 'tailwindcss/tailwind.css'
import Signup from "./signup";
import UpperNavbar from "../component/UpperNavbar";
import BottomNavbar from "../component/BottomNavbar";


export default function Home() {


    return (
            <div className='flex h-screen flex-col justify-center '>
                <UpperNavbar/>
                <Signup></Signup>
                <BottomNavbar/>
            </div>
    )
}

