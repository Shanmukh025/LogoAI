"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleArrowRight } from "lucide-react";
import { useState } from "react";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDescription from "./_components/LogoDescription";
import LogoDesign from "./_components/LogoDesign";
import LogoIdeas from "./_components/LogoIdeas";
import LogoTitle from "./_components/LogoTitle";

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
        <div className="mt-28 p-10 border rounded-xl">
            {step == 1 ? (
                <LogoTitle onHandleChange={(v) => onHandleChange("title", v)} />
            ) : step == 2 ? (
                <LogoDescription
                    onHandleChange={(v) => onHandleChange("desc", v)}
                />
            ) : step == 3 ? (
                <LogoColorPalette
                    onHandleChange={(v) => onHandleChange("palette", v)}
                />
            ) : step == 4 ? (
                <LogoDesign
                    onHandleChange={(v) => onHandleChange("design", v)}
                />
            ) : step == 5 ? (
                <LogoIdeas onHandleChange={(v) => onHandleChange("idea", v)} />
            ) : null}
            <div className="flex items-center justify-between mt-10">
                {step != 1 && (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
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
    );
}

export default CreateLogo;
