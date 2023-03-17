import Link from 'next/link';
import Image from 'next/image'

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";


// import {createNFT,getNFT,deactiveNFT,removeNFT } from "./client.js"

// import { getProviderOrSigner } from "./utils";

export default function Home(){

    return(
        <div className={styles.background}>
            
            <table class="table table-borderless">
                <tbody>
                <tr>
                    
                    <td>
                        <Link className="navbar-brand text-primary fst-italic" href="/NFT">
                            <Image src="/images/01.jpg" width="352" height="124" alt=""/>
                        </Link>
                    </td>
                    <td >
                        <Image src="/images/02.jpg" width="585" height="124" alt=""/></td>
                    <td>
                        <Image src="/images/03.jpg" width="215" height="124" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/04.jpg" width="1152" height="595" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/05.jpg" width="1152" height="357" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/06.jpg" width="1152" height="843" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/07.jpg" width="1152" height="161" alt=""/></td>
                </tr>
                <tr>
                    <td >
                        <Image src="/images/08.jpg" width="576" height="619" alt=""/></td>
                    <td >
                        <Image src="/images/09.jpg" width="576" height="619" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/10.jpg" width="1152" height="533" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/11.jpg" width="1152" height="156" alt=""/></td>
                </tr>
                <tr>
                    <td>
                        <Image src="/images/12.jpg" width="576" height="515" alt=""/></td>
                    <td>
                        <Image src="/images/13.jpg" width="576" height="515" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <Image src="/images/14.jpg" width="1152" height="349" alt=""/></td>
                </tr>
                <tr>
                    <td>
                        <Image src="/images/&#x5206;&#x9694;&#x7b26;.gif" width="352" height="1" alt=""/></td>
                    <td>
                        <Image src="/images/&#x5206;&#x9694;&#x7b26;.gif" width="224" height="1" alt=""/></td>
                    <td>
                        <Image src="/images/&#x5206;&#x9694;&#x7b26;.gif" width="361" height="1" alt=""/></td>
                    <td>
                        <Image src="/images/&#x5206;&#x9694;&#x7b26;.gif" width="215" height="1" alt=""/></td>
                </tr>

                </tbody>
                </table>
           
        </div>
    )

}