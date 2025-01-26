"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
        if (modelType != "Basic" && userDetail.credits <= 0) {
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
                <div className="text-center">
                    <h2 className="text-xl text-primary font-semibold text-gray-700 mb-4">
                        Generating Your Logo...
                    </h2>
                    <Image
                        src="/loading.gif"
                        alt="loading"
                        height={500}
                        width={500}
                    />
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
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
                    <Button
                        variant="outline"
                        className="my-6 flex justify-center"
                    >
                        Return Home
                    </Button>
                </div>
            )}
        </div>
    );
}

export default GenerateLogo;
