import Lookup from "@/app/_data/Lookup";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

function PricingModel({ formData }) {
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    useEffect(() => {
        if (formData?.title && typeof window !== "undefined") {
            localStorage.setItem("formData", JSON.stringify(formData));
        }
    }, [formData]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <HeadingDescription
                    title={Lookup.LogoPricingModelTitle}
                    description={Lookup.LogoPricingModelDesc}
                />
                <div className="flex items-center gap-2">
                    <Image src="coin.svg" alt="coin" width={30} height={30} />
                    <h2 className="text-primary text-2xl font-bold ">
                        {userDetail?.credits} Credits Left.
                    </h2>
                </div>
            </div>
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
                            <Link href={"/generate-logo?type=" + pricing.title}>
                                <Button className="mt-5">
                                    {pricing.button}
                                </Button>
                            </Link>
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
