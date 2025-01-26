"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowDownToLine, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function LogoList() {
    const { userDetail } = useContext(UserDetailContext);
    const [logoList, setLogoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userDetail) {
            getUserLogos();
        }
    }, [userDetail]);

    const getUserLogos = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(
                collection(db, "users", userDetail.email, "logos")
            );
            const logos = [];
            querySnapshot.forEach((doc) => {
                logos.push(doc.data());
            });
            setLogoList(logos);
        } catch (err) {
            setError("Failed to Load Logos. Please Try Again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const ViewLogo = (image) => {
        const win = window.open();
        win.document.write(
            `<img src="${image}" alt="Logo" height={100} width={100}/>`
        );
    };

    return (
        <div className="mt-10">
            {loading ? (
                <div className="flex justify-center items-center">
                    <p className="text-gray-500 text-lg">Loading Logos...</p>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center">
                    <p>{error}. Try Again.</p>
                </div>
            ) : logoList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {logoList.map((logo, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-xl">
                            <Image
                                src={logo?.image}
                                alt={logo.title || "Generated Logo"}
                                width={400}
                                height={200}
                                className="w-full rounded-xl object-cover"
                            />
                            <h3 className="mt-2 text-primary text-xl text-center text-gray-700 font-medium">
                                {logo.title || "Untitled Logo"}
                            </h3>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => ViewLogo(logo?.image)}
                                >
                                    <Eye /> View
                                </Button>

                                <a
                                    href={logo?.image}
                                    download={`${logo?.title || "logo"}.png`}
                                >
                                    <Button variant="outline">
                                        <ArrowDownToLine />
                                        Download
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-lg text-gray-500 text-center">
                    <p>No Logos Found. Start Generating Your First Logo!</p>
                </div>
            )}
        </div>
    );
}

export default LogoList;
