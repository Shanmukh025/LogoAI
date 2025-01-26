"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

function Info() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-primary text-3xl font-bold">
                    Hello, {userDetail?.name || "User"}!
                </h2>
                <div className="flex items-center gap-2">
                    <Image src="coin.svg" alt="coin" width={30} height={30} />
                    <h2 className="text-2xl font-bold ">
                        {userDetail?.credits} Credits Left.
                    </h2>
                </div>
            </div>
            <div className="mt-5 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Logo Dashboard</h2>
                <Link href="/create?logo">
                    <Button>⌘ Create Logo</Button>
                </Link>
            </div>
        </div>
    );
}

export default Info;
