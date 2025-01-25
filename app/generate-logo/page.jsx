"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import { Button } from "@/components/ui/button";

function GenerateLogo() {
    const { userDetail } = useContext(UserDetailContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState();
    const searchParams = useSearchParams();
    const modelType = searchParams.get("type");

    useEffect(() => {
        if (typeof window !== "undefined" && userDetail?.email) {
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

        try {
            const result = await axios.post("/api/ai-logo-model", {
                prompt: PROMPT,
                email: userDetail.email,
                title: formData.title,
                desc: formData.desc,
                type: modelType,
                userCredits: userDetail.credits,
            });
            console.log(result?.data);
            setLogoImage(result.data?.image);
        } catch (error) {
            console.error("Error generating logo:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (logoImage) {
            const link = document.createElement("a");
            link.href = logoImage;
            link.download = `${formData.title || "logo"}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {loading ? (
                <h2 className="text-lg font-semibold text-gray-700">
                    Loading... It may take a couple of minutes...
                </h2>
            ) : logoImage ? (
                <div className="text-center">
                    <Image
                        src={logoImage}
                        alt="Generated Logo"
                        height={300}
                        width={300}
                        className="rounded-lg shadow-md"
                    />
                    <div className="flex justify-center gap-2 my-8">
                        <Button onClick={downloadImage}>Download</Button>
                        <Button variant="outline">Dashboard</Button>
                    </div>
                </div>
            ) : (
                <h2 className="text-lg font-semibold text-gray-700">
                    Error Generating Logo. Fill The Details Again.
                </h2>
            )}
        </div>
    );
}

export default GenerateLogo;
