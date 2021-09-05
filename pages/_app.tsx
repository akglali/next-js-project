import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import UpperNavbar from "../component/UpperNavbar";
import React from "react";

function MyApp({Component, pageProps}: AppProps) {
    return <RecoilRoot>
            {process.browser && <>
                <UpperNavbar/>
                <Component {...pageProps} /></>}

    </RecoilRoot>
}

export default MyApp
