"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Header() {
    return (
        <div className="px-10 lg:px-32 xl:px-48 p-4 flex items-center justify-between shadow-sm">
            <Link href="/" className="flex items-center gap-2">
                <Image src={"/logo.svg"} alt="logo" width={30} height={80} />
                <h2 className="text-primary font-extrabold text-3xl text-400">
                    LOGOAI
                </h2>
            </Link>
            <Button className="text-lg">Get Started</Button>
        </div>
    );
}

export default Header;
