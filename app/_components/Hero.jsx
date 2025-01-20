"use client";
import Link from "next/link";
import { useState } from "react";
import Lookup from "../_data/Lookup";

function Hero() {
    const [logoTitle, setLogoTitle] = useState();
    return (
        <div className="flex items-center mt-24 flex-col gap-5">
            <h2 className="text-primary text-6xl text-center font-bold relative underline-animation">
                {Lookup.HeroHeading}
            </h2>
            <h2 className="text-4xl text-center font-bold">
                {Lookup.HeroSubheading}
            </h2>
            <p className="text-lg text-gray-500 text-center">
                {Lookup.HeroDesc}
            </p>
            <br />
            <h2 className="text-2xl text-center font-bold">
                Transform your Vision with LogoAI!
            </h2>
            <Link href={"/create?logo"}>
                {" "}
                <button className="genbtn w-full p-4 border-2 border-gray-300 rounded-md flex items-center justify-center gap-0 text-xl">
                    <svg
                        height="20"
                        width="20"
                        fill="#FFFFFF"
                        viewBox="0 0 24 24"
                        data-name="Layer 1"
                        id="Layer_1"
                        className="sparkle"
                    >
                        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                    </svg>
                    <span className="text">GENERATE</span>
                </button>
            </Link>
        </div>
    );
}

export default Hero;
