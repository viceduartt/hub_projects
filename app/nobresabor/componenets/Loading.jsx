"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Loading() {
    useGSAP(() => {
        const animaLoadingPageCard = (e) => {
            const background = document.querySelector(".backgroundPage")
            console.log(background)
    
    
            gsap.to(background, {
                duration: 0.5,
                opacity: 0,
            })
        }
    
        setTimeout(() => {
            animaLoadingPageCard()
        }, 100)

    }, [])

    return (
        <>
            <div className="backgroundPage"></div>
        </>
    );
}

export default Loading;