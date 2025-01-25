"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";

function GenerateLogo() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState();

    useEffect(() => {
        if (typeof window != undefined && userDetail?.email) {
            const storage = localStorage.getItem("formData");
            if (storage) {
                setFormData(JSON.parse(storage));
                console.log(JSON.parse(storage));
            }
        }
    }, [userDetail]);

    useEffect(() => {
        if (formData?.title) {
            GenerateAILogo();
        }
    }, [formData]);

    const GenerateAILogo = async () => {
        setLoading(true);
        const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.title)
            .replace("{logoDesc}", formData.desc)
            .replace("{logoColor}", formData.palette)
            .replace("{logoDesign}", formData.design.title)
            .replace("{logoIdea}", formData.idea)
            .replace("{logoPrompt}", formData.design.prompt);

        console.log(PROMPT);

        const result = await axios.post("/api/ai-logo-model", {
            prompt: PROMPT,
            email: userDetail.email,
            title: formData.title,
            desc: formData.desc,
        });
        console.log(result?.data);
        setLogoImage(result.data?.image);
        setLoading(false);
    };

    return (
        <div>
            <h2>{loading && "Loading..It may take a couple of minutes..."}</h2>
            {!loading && (
                <Image src={logoImage} alt="logo" height={300} width={300} />
            )}
        </div>
    );
}

export default GenerateLogo;
