"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowDownToLine, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";

function GenerateLogoContent() {
    const { userDetail } = useContext(UserDetailContext);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("formData");
            if (storage) {
                setFormData(JSON.parse(storage));
            }
        }
    }, []);

    const GenerateAILogo = async () => {
        const modelType = searchParams.get("type");

        if (modelType !== "Basic" && userDetail?.credits <= 0) {
            toast("Not Enough Credits!");
            return;
        }

        setLoading(true);
        const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.title)
            .replace("{logoDesc}", formData.desc)
            .replace("{logoColor}", formData.palette)
            .replace("{logoDesign}", formData.design.title)
            .replace("{logoIdea}", formData.idea)
            .replace("{logoPrompt}", formData.design.prompt);

        try {
            const result = await axios.post("/api/ai-logo-model", {
                prompt: PROMPT,
                email: userDetail?.email,
                title: formData?.title,
                desc: formData?.desc,
                type: modelType,
                userCredits: userDetail?.credits,
                timeout: 100000,
            });
            setLogoImage(result.data?.image);
        } catch (error) {
            console.error("Error generating logo:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formData?.title) {
            GenerateAILogo();
        }
    }, [formData]);

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
        <div className="flex flex-col items-center justify-center p-4 min-h-screen">
            {loading ? (
                <div className="text-center">
                    <h2 className="text-2xl text-primary font-semibold text-gray-700 mb-4">
                        Generating Your Logo...
                    </h2>
                    <Image
                        src="/loading.gif"
                        alt="loading"
                        height={400}
                        width={400}
                    />
                    <h2 className="my-5 text-xl font-semibold text-gray-700 mb-4">
                        Please Don't Refresh.
                    </h2>
                </div>
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
                        <Button onClick={downloadImage}>
                            <ArrowDownToLine />
                            Download
                        </Button>
                        <Link href="/dashboard" passHref>
                            <Button variant="outline">
                                <LayoutDashboard />
                                Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                        ~ Error Generating Logo. Try Again!
                    </h2>
                    <Link href="/" passHref>
                        <Button
                            variant="outline"
                            className="my-6 flex justify-center"
                        >
                            Return Home
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

// Dynamically import GenerateLogo with SSR disabled
const GenerateLogo = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenerateLogoContent />
        </Suspense>
    );
};

export default GenerateLogo;
