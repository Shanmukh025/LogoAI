"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
    const { user } = useUser();
    return (
        <div className="px-10 lg:px-32 xl:px-48 p-4 flex items-center justify-between shadow-sm">
            <Link href="/" className="flex items-center gap-2">
                <Image src={"/logo.svg"} alt="logo" width={200} height={150} />
            </Link>
            <div className="flex items-center gap-3">
                {user ? (
                    <Button>Dashboard</Button>
                ) : (
                    <Button className="text-lg">Get Started</Button>
                )}
                <UserButton />
            </div>
        </div>
    );
}

export default Header;
