import Lookup from "@/app/_data/Lookup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import { SignInButton, useUser } from "@clerk/nextjs";

function PricingModel({ formData }) {
    const { user } = useUser();
    useEffect(() => {
        console.log("Success", formData);
        if (formData?.title && typeof window !== "undefined") {
            localStorage.setItem("formData", JSON.stringify(formData));
        }
    }, [formData]);

    return (
        <div>
            <HeadingDescription
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
                {Lookup.pricingOption.map((pricing, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-5 border rounded-lg shadow-md"
                    >
                        <Image
                            src={pricing.icon}
                            alt="pricing"
                            width={60}
                            height={60}
                        />
                        <h2 className="font-medium text-xl">{pricing.title}</h2>
                        <div>
                            {pricing.features.map((feature, index) => (
                                <h2 key={index} className="text-lg mt-2">
                                    {feature}
                                </h2>
                            ))}
                        </div>
                        {user ? (
                            <Button className="mt-5">{pricing.button}</Button>
                        ) : (
                            <SignInButton
                                mode="modal"
                                forceRedirectUrl={
                                    "/generate-logo?type=" + pricing.title
                                }
                            >
                                <Button className="mt-5">
                                    {pricing.button}
                                </Button>
                            </SignInButton>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingModel;
