"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleArrowRight } from "lucide-react";
import { useState } from "react";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDescription from "./_components/LogoDescription";
import LogoDesign from "./_components/LogoDesign";
import LogoIdeas from "./_components/LogoIdeas";
import LogoTitle from "./_components/LogoTitle";
import PricingModel from "./_components/PricingModel";
import Link from "next/link";

function CreateLogo() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const onHandleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        console.log("onHandleChange", formData);
    };
    return (
        <div>
            <div className="mt-28 p-10 border-2 border-black-500 rounded-xl">
                {step == 1 ? (
                    <LogoTitle
                        onHandleChange={(v) => onHandleChange("title", v)}
                        formData={formData}
                    />
                ) : step == 2 ? (
                    <LogoDescription
                        onHandleChange={(v) => onHandleChange("desc", v)}
                        formData={formData}
                    />
                ) : step == 3 ? (
                    <LogoColorPalette
                        onHandleChange={(v) => onHandleChange("palette", v)}
                        formData={formData}
                    />
                ) : step == 4 ? (
                    <LogoDesign
                        onHandleChange={(v) => onHandleChange("design", v)}
                        formData={formData}
                    />
                ) : step == 5 ? (
                    <LogoIdeas
                        onHandleChange={(v) => onHandleChange("idea", v)}
                        formData={formData}
                    />
                ) : step == 6 ? (
                    <PricingModel
                        onHandleChange={(v) => onHandleChange("pricing", v)}
                        formData={formData}
                    />
                ) : null}
                <div className="flex items-center justify-between mt-10">
                    {step != 1 && (
                        <Button
                            variant="outline"
                            onClick={() => setStep(step - 1)}
                        >
                            <ArrowLeft />
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={() => setStep(step + 1)}
                        className="flex items-center gap-1"
                    >
                        Continue
                        <CircleArrowRight />
                    </Button>
                </div>
            </div>
            <div className="text-center">
                <Button className="text-primary text-xl my-12" variant="link">
                    <Link href="https://shanmukh25.vercel.app/" target="_blank">
                        Developed by Shanmukh.
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default CreateLogo;
