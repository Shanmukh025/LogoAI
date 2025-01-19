"use client";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import HeadingDescription from "./HeadingDescription";

function LogoTitle({ onHandleChange }) {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState(searchParams?.get("title") ?? "");

    return (
        <div>
            <HeadingDescription
                title={Lookup?.LogoTitle}
                description={Lookup.LogoTitleDesc}
            />
            <input
                type="text"
                placeholder={Lookup.InputTitlePlaceHolder}
                className="p-4 border rounded-lg mt-2 w-[40%] text-xl"
                defaultValue={title}
                onChange={(e) => onHandleChange(e.target.value)}
            />
        </div>
    );
}

export default LogoTitle;
