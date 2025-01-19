"use client";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
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
            <div className="flex gap-6 w-full max-w-2xl mt-10 text-lg">
                <input
                    placeholder={Lookup.InputTitlePlaceHolder}
                    className="p-3 border rounded-md w-full shadow-md"
                    onChange={(event) => setLogoTitle(event?.target.value)}
                />
                <Link href={"/create?title=" + logoTitle}>
                    <Button className="w-full p-6 flex items-center gap-1 text-lg">
                        <Zap fill="white" />
                        GENERATE
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;
