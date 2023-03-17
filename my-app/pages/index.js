import Link from 'next/link';

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import { HomeFillIcon } from "@primer/octicons-react";
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
                            <img src="images/&#x7f51;&#x9875;_01.jpg" width="352" height="124" alt=""/>
                        </Link>
                    </td>
                    <td>
                        <img src="images/&#x7f51;&#x9875;_02.jpg" width="585" height="124" alt=""/></td>
                    <td>
                        <img src="images/&#x7f51;&#x9875;_03.jpg" width="215" height="124" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_04.jpg" width="1152" height="595" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_05.jpg" width="1152" height="357" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_06.jpg" width="1152" height="843" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_07.jpg" width="1152" height="161" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <img src="images/&#x7f51;&#x9875;_08.jpg" width="576" height="619" alt=""/></td>
                    <td colspan="2">
                        <img src="images/&#x7f51;&#x9875;_09.jpg" width="576" height="619" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_10.jpg" width="1152" height="533" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_11.jpg" width="1152" height="156" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <img src="images/&#x7f51;&#x9875;_12.jpg" width="576" height="515" alt=""/></td>
                    <td colspan="2">
                        <img src="images/&#x7f51;&#x9875;_13.jpg" width="576" height="515" alt=""/></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <img src="images/&#x7f51;&#x9875;_14.jpg" width="1152" height="349" alt=""/></td>
                </tr>
                <tr>
                    <td>
                        <img src="images/&#x5206;&#x9694;&#x7b26;.gif" width="352" height="1" alt=""/></td>
                    <td>
                        <img src="images/&#x5206;&#x9694;&#x7b26;.gif" width="224" height="1" alt=""/></td>
                    <td>
                        <img src="images/&#x5206;&#x9694;&#x7b26;.gif" width="361" height="1" alt=""/></td>
                    <td>
                        <img src="images/&#x5206;&#x9694;&#x7b26;.gif" width="215" height="1" alt=""/></td>
                </tr>

                </tbody>
                </table>
           
        </div>
    )

}