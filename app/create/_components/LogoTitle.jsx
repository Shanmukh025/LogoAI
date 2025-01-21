"use client";
import Lookup from "@/app/_data/Lookup";
import { useState } from "react";
import HeadingDescription from "./HeadingDescription";

function LogoTitle({ onHandleChange, formData }) {
    const [title, setTitle] = useState("");

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onHandleChange(newTitle);
    };

    return (
        <div>
            <HeadingDescription
                title={Lookup?.LogoTitle}
                description={Lookup.LogoTitleDesc}
            />
            <input
                type="text"
                placeholder={Lookup.InputTitlePlaceHolder}
                className="p-4 border rounded-lg mt-2 w-[100%] text-xl"
                value={formData?.title || ""}
                onChange={handleTitleChange}
            />
        </div>
    );
}

export default LogoTitle;
